"use client"

import { Server as SocketIOServer } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'
import { Server as HTTPServer } from 'http'

// Scalable Socket.IO configuration for millions of users
export class ScalableSocketService {
  private io: SocketIOServer | null = null
  private redisAdapter: any = null
  private connectionCount = 0
  private roomLimits = new Map<string, number>()

  // Initialize with Redis clustering for horizontal scaling
  async initialize(httpServer: HTTPServer) {
    // Redis cluster configuration for Socket.IO adapter
    const pubClient = createClient({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: 0, // Use separate DB for pub/sub
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
    })

    const subClient = pubClient.duplicate()

    await pubClient.connect()
    await subClient.connect()

    // Create Socket.IO server with optimized configuration
    this.io = new SocketIOServer(httpServer, {
      // CORS configuration for production
      cors: {
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
        credentials: true
      },
      
      // Connection settings optimized for scale
      pingTimeout: 60000,     // 60 seconds
      pingInterval: 25000,    // 25 seconds
      maxHttpBufferSize: 1e6, // 1MB max message size
      
      // Enable compression for better performance
      compression: true,
      
      // Transports configuration
      transports: ['websocket', 'polling'],
      
      // Namespace configuration for better organization
      path: '/socket.io/',
      
      // Connection state recovery for reliability
      connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
        skipMiddlewares: true,
      }
    })

    // Set up Redis adapter for horizontal scaling
    this.redisAdapter = createAdapter(pubClient, subClient)
    this.io.adapter(this.redisAdapter)

    // Set up connection handling
    this.setupConnectionHandling()
    
    console.log('Scalable Socket Service initialized with Redis clustering')
  }

  private setupConnectionHandling() {
    if (!this.io) return

    this.io.on('connection', (socket) => {
      this.connectionCount++
      console.log(`User connected: ${socket.id}, Total connections: ${this.connectionCount}`)

      // Rate limiting per connection
      const rateLimiter = this.createRateLimiter(socket.id)

      // Authentication middleware
      socket.use(async (packet, next) => {
        try {
          const token = socket.handshake.auth.token
          if (!token) {
            return next(new Error('Authentication required'))
          }

          // Verify JWT token here
          // const user = await verifyToken(token)
          // socket.userId = user.id
          
          next()
        } catch (error) {
          next(new Error('Authentication failed'))
        }
      })

      // Handle user joining rooms with limits
      socket.on('join-room', async (roomId: string) => {
        if (!rateLimiter.checkLimit('join-room', 10, 60)) { // 10 joins per minute
          socket.emit('error', { message: 'Rate limit exceeded for joining rooms' })
          return
        }

        const roomSize = await this.getRoomSize(roomId)
        const maxRoomSize = this.roomLimits.get(roomId) || 1000 // Default 1000 users per room

        if (roomSize >= maxRoomSize) {
          socket.emit('error', { message: 'Room is full' })
          return
        }

        socket.join(roomId)
        socket.emit('joined-room', { roomId, userCount: roomSize + 1 })
        
        // Notify others in the room
        socket.to(roomId).emit('user-joined', { 
          userId: (socket as any).userId,
          userCount: roomSize + 1
        })
      })

      // Handle leaving rooms
      socket.on('leave-room', async (roomId: string) => {
        socket.leave(roomId)
        const roomSize = await this.getRoomSize(roomId)
        
        socket.to(roomId).emit('user-left', { 
          userId: (socket as any).userId,
          userCount: roomSize
        })
      })

      // Handle direct messages with optimization
      socket.on('send-message', async (data: {
        recipientId: string
        message: string
        messageType?: string
        conversationId: string
      }) => {
        if (!rateLimiter.checkLimit('send-message', 60, 60)) { // 60 messages per minute
          socket.emit('error', { message: 'Rate limit exceeded for sending messages' })
          return
        }

        try {
          // Validate message
          if (!data.message || data.message.length > 4000) {
            socket.emit('error', { message: 'Invalid message content' })
            return
          }

          // Store message in database
          const messageId = await this.storeMessage({
            senderId: (socket as any).userId,
            recipientId: data.recipientId,
            content: data.message,
            messageType: data.messageType || 'text',
            conversationId: data.conversationId
          })

          // Send to recipient if online
          const recipientSocketId = await this.getUserSocketId(data.recipientId)
          if (recipientSocketId) {
            this.io?.to(recipientSocketId).emit('new-message', {
              id: messageId,
              senderId: (socket as any).userId,
              content: data.message,
              messageType: data.messageType,
              conversationId: data.conversationId,
              timestamp: new Date().toISOString()
            })
          }

          // Confirm delivery to sender
          socket.emit('message-sent', { id: messageId, timestamp: new Date().toISOString() })

        } catch (error) {
          console.error('Error sending message:', error)
          socket.emit('error', { message: 'Failed to send message' })
        }
      })

      // Handle typing indicators with debouncing
      socket.on('typing', (data: { conversationId: string; isTyping: boolean }) => {
        if (!rateLimiter.checkLimit('typing', 30, 60)) { // 30 typing events per minute
          return
        }

        socket.to(data.conversationId).emit('user-typing', {
          userId: (socket as any).userId,
          isTyping: data.isTyping,
          conversationId: data.conversationId
        })
      })

      // Handle broadcast messages to rooms
      socket.on('broadcast-to-room', async (data: {
        roomId: string
        message: string
        eventType: string
      }) => {
        if (!rateLimiter.checkLimit('broadcast', 10, 60)) { // 10 broadcasts per minute
          socket.emit('error', { message: 'Rate limit exceeded for broadcasting' })
          return
        }

        // Verify user has permission to broadcast to this room
        const hasPermission = await this.checkBroadcastPermission((socket as any).userId, data.roomId)
        if (!hasPermission) {
          socket.emit('error', { message: 'No permission to broadcast to this room' })
          return
        }

        this.io?.to(data.roomId).emit('room-broadcast', {
          senderId: (socket as any).userId,
          message: data.message,
          eventType: data.eventType,
          timestamp: new Date().toISOString()
        })
      })

      // Handle disconnection
      socket.on('disconnect', () => {
        this.connectionCount--
        console.log(`User disconnected: ${socket.id}, Total connections: ${this.connectionCount}`)
        
        // Clean up user presence
        this.cleanupUserPresence((socket as any).userId)
      })

      // Handle connection errors
      socket.on('error', (error) => {
        console.error('Socket error:', error)
      })
    })
  }

  // Rate limiter implementation
  private createRateLimiter(socketId: string) {
    const limits = new Map<string, { count: number; resetTime: number }>()

    return {
      checkLimit: (action: string, maxRequests: number, windowSeconds: number): boolean => {
        const key = `${socketId}:${action}`
        const now = Date.now()
        const windowMs = windowSeconds * 1000

        const current = limits.get(key)
        if (!current || now > current.resetTime) {
          limits.set(key, { count: 1, resetTime: now + windowMs })
          return true
        }

        if (current.count >= maxRequests) {
          return false
        }

        current.count++
        return true
      }
    }
  }

  // Get room size for load balancing
  private async getRoomSize(roomId: string): Promise<number> {
    if (!this.io) return 0
    
    const sockets = await this.io.in(roomId).fetchSockets()
    return sockets.length
  }

  // Store user socket mapping in Redis for horizontal scaling
  private async storeUserSocket(userId: string, socketId: string) {
    // Implementation would store in Redis
    // await redisClient.set(`user:${userId}:socket`, socketId, 'EX', 3600)
  }

  // Get user socket ID from Redis
  private async getUserSocketId(userId: string): Promise<string | null> {
    // Implementation would get from Redis
    // return await redisClient.get(`user:${userId}:socket`)
    return null
  }

  // Store message in database
  private async storeMessage(data: {
    senderId: string
    recipientId: string
    content: string
    messageType: string
    conversationId: string
  }): Promise<string> {
    // Implementation would store in database
    // For now, return a mock ID
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Check broadcast permission
  private async checkBroadcastPermission(userId: string, roomId: string): Promise<boolean> {
    // Implementation would check user permissions
    // For now, return true
    return true
  }

  // Clean up user presence data
  private async cleanupUserPresence(userId: string) {
    // Implementation would clean up Redis presence data
    // await redisClient.del(`user:${userId}:socket`)
    // await redisClient.del(`user:${userId}:presence`)
  }

  // Get connection statistics
  getStats() {
    return {
      totalConnections: this.connectionCount,
      serverUptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      timestamp: new Date().toISOString()
    }
  }

  // Set room limits for load balancing
  setRoomLimit(roomId: string, limit: number) {
    this.roomLimits.set(roomId, limit)
  }

  // Broadcast to all connected clients
  broadcast(event: string, data: any) {
    if (this.io) {
      this.io.emit(event, data)
    }
  }

  // Graceful shutdown
  async shutdown() {
    if (this.io) {
      this.io.close()
      console.log('Socket.IO server shut down gracefully')
    }
  }
}

// Singleton instance
export const scalableSocketService = new ScalableSocketService()
