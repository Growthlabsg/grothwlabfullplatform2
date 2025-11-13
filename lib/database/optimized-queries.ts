"use client"

import { executeQuery } from './connection-pool'

// Optimized database queries with proper indexing and caching

// User queries with optimized indexing
export const userQueries = {
  // Get user with optimized query
  async getUser(userId: string) {
    const query = `
      SELECT u.*, up.avatar_url, up.bio, up.company, up.role
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE u.id = $1 AND u.deleted_at IS NULL
    `
    return executeQuery(query, [userId], { useReadReplica: true })
  },

  // Get multiple users with single query (N+1 problem fix)
  async getUsers(userIds: string[]) {
    const query = `
      SELECT u.*, up.avatar_url, up.bio, up.company, up.role
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE u.id = ANY($1) AND u.deleted_at IS NULL
      ORDER BY u.created_at DESC
    `
    return executeQuery(query, [userIds], { useReadReplica: true })
  },

  // Search users with full-text search and pagination
  async searchUsers(searchTerm: string, limit = 20, offset = 0) {
    const query = `
      SELECT u.id, u.email, u.name, up.avatar_url, up.company, up.role,
             ts_rank(search_vector, plainto_tsquery($1)) as rank
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE u.search_vector @@ plainto_tsquery($1)
        AND u.deleted_at IS NULL
      ORDER BY rank DESC, u.created_at DESC
      LIMIT $2 OFFSET $3
    `
    return executeQuery(query, [searchTerm, limit, offset], { useReadReplica: true })
  }
}

// Message queries optimized for high throughput
export const messageQueries = {
  // Get conversation messages with pagination and caching
  async getConversationMessages(conversationId: string, limit = 50, cursor?: string) {
    const query = cursor ? `
      SELECT m.*, u.name as sender_name, up.avatar_url as sender_avatar
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE m.conversation_id = $1 AND m.created_at < $2
        AND m.deleted_at IS NULL
      ORDER BY m.created_at DESC
      LIMIT $3
    ` : `
      SELECT m.*, u.name as sender_name, up.avatar_url as sender_avatar
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE m.conversation_id = $1 AND m.deleted_at IS NULL
      ORDER BY m.created_at DESC
      LIMIT $2
    `
    
    const params = cursor ? [conversationId, cursor, limit] : [conversationId, limit]
    return executeQuery(query, params, { useReadReplica: true })
  },

  // Insert message with optimized batch processing
  async insertMessage(message: {
    id: string
    conversationId: string
    senderId: string
    content: string
    messageType?: string
    metadata?: any
  }) {
    const query = `
      INSERT INTO messages (id, conversation_id, sender_id, content, message_type, metadata, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id, created_at
    `
    
    return executeQuery(query, [
      message.id,
      message.conversationId,
      message.senderId,
      message.content,
      message.messageType || 'text',
      message.metadata ? JSON.stringify(message.metadata) : null
    ])
  },

  // Bulk insert messages for better performance
  async insertMessages(messages: Array<{
    id: string
    conversationId: string
    senderId: string
    content: string
    messageType?: string
    metadata?: any
  }>) {
    const values = messages.map((_, index) => {
      const base = index * 6
      return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, NOW())`
    }).join(', ')
    
    const query = `
      INSERT INTO messages (id, conversation_id, sender_id, content, message_type, metadata, created_at)
      VALUES ${values}
      RETURNING id, created_at
    `
    
    const params = messages.flatMap(m => [
      m.id,
      m.conversationId,
      m.senderId,
      m.content,
      m.messageType || 'text',
      m.metadata ? JSON.stringify(m.metadata) : null
    ])
    
    return executeQuery(query, params)
  }
}

// Feed queries with advanced caching and pagination
export const feedQueries = {
  // Get user feed with optimized joins
  async getUserFeed(userId: string, limit = 20, cursor?: string) {
    const query = cursor ? `
      SELECT 
        p.*,
        u.name as author_name,
        up.avatar_url as author_avatar,
        up.company as author_company,
        (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as likes_count,
        (SELECT COUNT(*) FROM post_comments pc WHERE pc.post_id = p.id AND pc.deleted_at IS NULL) as comments_count,
        EXISTS(SELECT 1 FROM post_likes pl WHERE pl.post_id = p.id AND pl.user_id = $1) as is_liked
      FROM feed_posts p
      JOIN users u ON p.author_id = u.id
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN user_connections uc ON (uc.user1_id = $1 AND uc.user2_id = p.author_id) OR (uc.user2_id = $1 AND uc.user1_id = p.author_id)
      WHERE (p.author_id = $1 OR uc.status = 'accepted' OR p.visibility = 'public')
        AND p.created_at < $2
        AND p.deleted_at IS NULL
      ORDER BY p.created_at DESC
      LIMIT $3
    ` : `
      SELECT 
        p.*,
        u.name as author_name,
        up.avatar_url as author_avatar,
        up.company as author_company,
        (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as likes_count,
        (SELECT COUNT(*) FROM post_comments pc WHERE pc.post_id = p.id AND pc.deleted_at IS NULL) as comments_count,
        EXISTS(SELECT 1 FROM post_likes pl WHERE pl.post_id = p.id AND pl.user_id = $1) as is_liked
      FROM feed_posts p
      JOIN users u ON p.author_id = u.id
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN user_connections uc ON (uc.user1_id = $1 AND uc.user2_id = p.author_id) OR (uc.user2_id = $1 AND uc.user1_id = p.author_id)
      WHERE (p.author_id = $1 OR uc.status = 'accepted' OR p.visibility = 'public')
        AND p.deleted_at IS NULL
      ORDER BY p.created_at DESC
      LIMIT $2
    `
    
    const params = cursor ? [userId, cursor, limit] : [userId, limit]
    return executeQuery(query, params, { useReadReplica: true })
  },

  // Get trending posts with optimized scoring
  async getTrendingPosts(limit = 20, timeframe = '24 hours') {
    const query = `
      SELECT 
        p.*,
        u.name as author_name,
        up.avatar_url as author_avatar,
        up.company as author_company,
        (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) as likes_count,
        (SELECT COUNT(*) FROM post_comments pc WHERE pc.post_id = p.id AND pc.deleted_at IS NULL) as comments_count,
        (
          (SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id AND pl.created_at > NOW() - INTERVAL $2) * 2 +
          (SELECT COUNT(*) FROM post_comments pc WHERE pc.post_id = p.id AND pc.created_at > NOW() - INTERVAL $2) * 3 +
          (SELECT COUNT(*) FROM post_shares ps WHERE ps.post_id = p.id AND ps.created_at > NOW() - INTERVAL $2) * 5
        ) as trending_score
      FROM feed_posts p
      JOIN users u ON p.author_id = u.id
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE p.created_at > NOW() - INTERVAL $2
        AND p.deleted_at IS NULL
        AND p.visibility = 'public'
      ORDER BY trending_score DESC, p.created_at DESC
      LIMIT $1
    `
    
    return executeQuery(query, [limit, timeframe], { useReadReplica: true })
  }
}

// Connection queries optimized for social features
export const connectionQueries = {
  // Get user connections with pagination
  async getUserConnections(userId: string, limit = 50, offset = 0) {
    const query = `
      SELECT 
        CASE 
          WHEN uc.user1_id = $1 THEN u2.id
          ELSE u1.id
        END as connection_id,
        CASE 
          WHEN uc.user1_id = $1 THEN u2.name
          ELSE u1.name
        END as connection_name,
        CASE 
          WHEN uc.user1_id = $1 THEN up2.avatar_url
          ELSE up1.avatar_url
        END as connection_avatar,
        CASE 
          WHEN uc.user1_id = $1 THEN up2.company
          ELSE up1.company
        END as connection_company,
        uc.status,
        uc.created_at as connected_at
      FROM user_connections uc
      JOIN users u1 ON uc.user1_id = u1.id
      JOIN users u2 ON uc.user2_id = u2.id
      LEFT JOIN user_profiles up1 ON u1.id = up1.user_id
      LEFT JOIN user_profiles up2 ON u2.id = up2.user_id
      WHERE (uc.user1_id = $1 OR uc.user2_id = $1)
        AND uc.status = 'accepted'
        AND u1.deleted_at IS NULL
        AND u2.deleted_at IS NULL
      ORDER BY uc.created_at DESC
      LIMIT $2 OFFSET $3
    `
    
    return executeQuery(query, [userId, limit, offset], { useReadReplica: true })
  },

  // Check connection status between users
  async getConnectionStatus(userId1: string, userId2: string) {
    const query = `
      SELECT status, created_at
      FROM user_connections
      WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)
      LIMIT 1
    `
    
    return executeQuery(query, [userId1, userId2], { useReadReplica: true })
  }
}

// Analytics queries for performance monitoring
export const analyticsQueries = {
  // Get user activity metrics
  async getUserActivityMetrics(userId: string, days = 30) {
    const query = `
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as activity_count,
        action
      FROM activity_logs
      WHERE user_id = $1 
        AND created_at > NOW() - INTERVAL '${days} days'
      GROUP BY DATE(created_at), action
      ORDER BY date DESC
    `
    
    return executeQuery(query, [userId], { useReadReplica: true })
  },

  // Get platform usage statistics
  async getPlatformStats(days = 7) {
    const query = `
      SELECT 
        'active_users' as metric,
        COUNT(DISTINCT user_id) as value
      FROM activity_logs
      WHERE created_at > NOW() - INTERVAL '${days} days'
      
      UNION ALL
      
      SELECT 
        'total_messages' as metric,
        COUNT(*) as value
      FROM messages
      WHERE created_at > NOW() - INTERVAL '${days} days'
        AND deleted_at IS NULL
      
      UNION ALL
      
      SELECT 
        'total_posts' as metric,
        COUNT(*) as value
      FROM feed_posts
      WHERE created_at > NOW() - INTERVAL '${days} days'
        AND deleted_at IS NULL
    `
    
    return executeQuery(query, [], { useReadReplica: true })
  }
}
