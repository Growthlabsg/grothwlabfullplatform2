"use client"

import { Pool, PoolConfig } from 'pg'

// Database connection pool configuration for scalability
const poolConfig: PoolConfig = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  database: process.env.DATABASE_NAME || 'growthlab',
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  
  // Connection pool settings for high concurrency
  max: parseInt(process.env.DATABASE_MAX_CONNECTIONS || '100'), // Maximum connections
  min: parseInt(process.env.DATABASE_MIN_CONNECTIONS || '10'),  // Minimum connections
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000, // 10 second connection timeout
  
  // Query timeout to prevent hanging queries
  query_timeout: 30000, // 30 second query timeout
  
  // Enable SSL in production
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
}

// Read replica configuration for scaling reads
const readReplicaConfig: PoolConfig = {
  ...poolConfig,
  host: process.env.DATABASE_READ_HOST || process.env.DATABASE_HOST || 'localhost',
  max: parseInt(process.env.DATABASE_READ_MAX_CONNECTIONS || '50'),
}

// Primary database pool (for writes)
export const primaryPool = new Pool(poolConfig)

// Read replica pool (for reads)
export const readPool = new Pool(readReplicaConfig)

// Database connection health check
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const client = await primaryPool.connect()
    await client.query('SELECT 1')
    client.release()
    return true
  } catch (error) {
    console.error('Database health check failed:', error)
    return false
  }
}

// Graceful shutdown
export async function closeConnections(): Promise<void> {
  try {
    await primaryPool.end()
    await readPool.end()
    console.log('Database connections closed gracefully')
  } catch (error) {
    console.error('Error closing database connections:', error)
  }
}

// Connection monitoring
export function getConnectionStats() {
  return {
    primary: {
      totalCount: primaryPool.totalCount,
      idleCount: primaryPool.idleCount,
      waitingCount: primaryPool.waitingCount,
    },
    read: {
      totalCount: readPool.totalCount,
      idleCount: readPool.idleCount,
      waitingCount: readPool.waitingCount,
    }
  }
}

// Query execution with automatic read/write routing
export async function executeQuery(
  query: string, 
  params: any[] = [], 
  options: { useReadReplica?: boolean; timeout?: number } = {}
): Promise<any> {
  const { useReadReplica = false, timeout = 30000 } = options
  const pool = useReadReplica ? readPool : primaryPool
  
  const client = await pool.connect()
  
  try {
    // Set query timeout
    await client.query(`SET statement_timeout = ${timeout}`)
    
    const result = await client.query(query, params)
    return result
  } catch (error) {
    console.error('Query execution error:', error)
    throw error
  } finally {
    client.release()
  }
}

// Transaction support with automatic retry
export async function executeTransaction(
  queries: Array<{ query: string; params?: any[] }>,
  options: { retries?: number } = {}
): Promise<any[]> {
  const { retries = 3 } = options
  let attempt = 0
  
  while (attempt < retries) {
    const client = await primaryPool.connect()
    
    try {
      await client.query('BEGIN')
      
      const results = []
      for (const { query, params = [] } of queries) {
        const result = await client.query(query, params)
        results.push(result)
      }
      
      await client.query('COMMIT')
      return results
    } catch (error) {
      await client.query('ROLLBACK')
      attempt++
      
      if (attempt >= retries) {
        console.error('Transaction failed after retries:', error)
        throw error
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    } finally {
      client.release()
    }
  }
  
  throw new Error('Transaction failed after maximum retries')
}
