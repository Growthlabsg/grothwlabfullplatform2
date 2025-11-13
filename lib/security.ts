import crypto from 'crypto'
import { NextRequest } from 'next/server'

// Security configuration constants
export const SECURITY_CONFIG = {
  // Password requirements
  PASSWORD_MIN_LENGTH: 12,
  PASSWORD_REQUIRE_UPPERCASE: true,
  PASSWORD_REQUIRE_LOWERCASE: true,
  PASSWORD_REQUIRE_NUMBERS: true,
  PASSWORD_REQUIRE_SPECIAL_CHARS: true,
  PASSWORD_MAX_AGE_DAYS: 90,
  
  // Session security
  SESSION_TIMEOUT_MINUTES: 30,
  MAX_CONCURRENT_SESSIONS: 3,
  SESSION_REFRESH_THRESHOLD: 5, // minutes before expiry
  
  // OAuth security
  OAUTH_STATE_LENGTH: 32,
  OAUTH_PKCE_LENGTH: 43,
  OAUTH_TOKEN_EXPIRY_HOURS: 24,
  
  // API security
  API_KEY_LENGTH: 64,
  API_RATE_LIMIT_WINDOW_MS: 60000,
  API_MAX_REQUESTS_PER_WINDOW: 100,
  
  // Encryption
  ENCRYPTION_ALGORITHM: 'aes-256-gcm',
  HASH_ALGORITHM: 'sha256',
  KEY_DERIVATION_ITERATIONS: 100000,
  KEY_DERIVATION_KEY_LENGTH: 32,
  
  // JWT security
  JWT_ALGORITHM: 'HS256',
  JWT_EXPIRY_HOURS: 24,
  JWT_REFRESH_EXPIRY_DAYS: 30,
  
  // CSRF protection
  CSRF_TOKEN_LENGTH: 32,
  CSRF_TOKEN_EXPIRY_MINUTES: 30,
  
  // File upload security
  MAX_FILE_SIZE_MB: 10,
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  SCAN_UPLOADS_FOR_MALWARE: true,
  
  // Audit logging
  LOG_SECURITY_EVENTS: true,
  LOG_USER_ACTIONS: true,
  LOG_ADMIN_ACTIONS: true,
  AUDIT_LOG_RETENTION_DAYS: 365,
} as const

// Password validation
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < SECURITY_CONFIG.PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} characters long`)
  }
  
  if (SECURITY_CONFIG.PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (SECURITY_CONFIG.PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (SECURITY_CONFIG.PASSWORD_REQUIRE_NUMBERS && !/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (SECURITY_CONFIG.PASSWORD_REQUIRE_SPECIAL_CHARS && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  // Check for common weak passwords
  const commonPasswords = [
    'password', '123456', 'qwerty', 'admin', 'letmein',
    'welcome', 'monkey', 'dragon', 'master', 'hello'
  ]
  
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common. Please choose a stronger password')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Password hashing with salt
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(
    password,
    salt,
    SECURITY_CONFIG.KEY_DERIVATION_ITERATIONS,
    SECURITY_CONFIG.KEY_DERIVATION_KEY_LENGTH,
    SECURITY_CONFIG.HASH_ALGORITHM
  ).toString('hex')
  
  return `${salt}:${hash}`
}

// Password verification
export function verifyPassword(password: string, hashedPassword: string): boolean {
  const [salt, hash] = hashedPassword.split(':')
  const verifyHash = crypto.pbkdf2Sync(
    password,
    salt,
    SECURITY_CONFIG.KEY_DERIVATION_ITERATIONS,
    SECURITY_CONFIG.KEY_DERIVATION_KEY_LENGTH,
    SECURITY_CONFIG.HASH_ALGORITHM
  ).toString('hex')
  
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verifyHash, 'hex'))
}

// Generate secure random tokens
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

// Generate OAuth state parameter
export function generateOAuthState(): string {
  return generateSecureToken(SECURITY_CONFIG.OAUTH_STATE_LENGTH)
}

// Generate PKCE code verifier and challenge
export function generatePKCE(): { codeVerifier: string; codeChallenge: string } {
  const codeVerifier = generateSecureToken(SECURITY_CONFIG.OAUTH_PKCE_LENGTH)
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url')
  
  return { codeVerifier, codeChallenge }
}

// Encrypt sensitive data
export function encryptData(data: string, key: string): { encryptedData: string; iv: string } {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipher(SECURITY_CONFIG.ENCRYPTION_ALGORITHM, key)
  
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  return {
    encryptedData: encrypted,
    iv: iv.toString('hex')
  }
}

// Decrypt sensitive data
export function decryptData(encryptedData: string, key: string, iv: string): string {
  const decipher = crypto.createDecipher(SECURITY_CONFIG.ENCRYPTION_ALGORITHM, key)
  
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}

// Generate JWT token
export function generateJWT(payload: any, secret: string, expiresIn: string = '24h'): string {
  const header = {
    alg: SECURITY_CONFIG.JWT_ALGORITHM,
    typ: 'JWT'
  }
  
  const now = Math.floor(Date.now() / 1000)
  const exp = now + (parseInt(expiresIn) * 3600) // Convert hours to seconds
  
  const finalPayload = {
    ...payload,
    iat: now,
    exp,
    nbf: now
  }
  
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url')
  const encodedPayload = Buffer.from(JSON.stringify(finalPayload)).toString('base64url')
  
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url')
  
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

// Verify JWT token
export function verifyJWT(token: string, secret: string): { isValid: boolean; payload?: any; error?: string } {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return { isValid: false, error: 'Invalid token format' }
    }
    
    const [header, payload, signature] = parts
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('base64url')
    
    if (signature !== expectedSignature) {
      return { isValid: false, error: 'Invalid signature' }
    }
    
    // Decode payload
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString())
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (decodedPayload.exp && decodedPayload.exp < now) {
      return { isValid: false, error: 'Token expired' }
    }
    
    // Check not before
    if (decodedPayload.nbf && decodedPayload.nbf > now) {
      return { isValid: false, error: 'Token not yet valid' }
    }
    
    return { isValid: true, payload: decodedPayload }
  } catch (error) {
    return { isValid: false, error: 'Token verification failed' }
  }
}

// Generate CSRF token
export function generateCSRFToken(): string {
  return generateSecureToken(SECURITY_CONFIG.CSRF_TOKEN_LENGTH)
}

// Validate CSRF token
export function validateCSRFToken(token: string, storedToken: string): boolean {
  return crypto.timingSafeEqual(
    Buffer.from(token, 'hex'),
    Buffer.from(storedToken, 'hex')
  )
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim()
}

// Validate file upload
export function validateFileUpload(
  file: File,
  maxSizeMB: number = SECURITY_CONFIG.MAX_FILE_SIZE_MB,
  allowedTypes: string[] = SECURITY_CONFIG.ALLOWED_FILE_TYPES
): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    errors.push(`File size must be less than ${maxSizeMB}MB`)
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`)
  }
  
  // Check file extension
  const fileName = file.name.toLowerCase()
  const allowedExtensions = allowedTypes.map(type => {
    switch (type) {
      case 'image/jpeg': return '.jpg,.jpeg'
      case 'image/png': return '.png'
      case 'image/gif': return '.gif'
      case 'application/pdf': return '.pdf'
      default: return ''
    }
  }).join(',').split(',').filter(Boolean)
  
  const fileExtension = fileName.substring(fileName.lastIndexOf('.'))
  if (!allowedExtensions.includes(fileExtension)) {
    errors.push(`File extension ${fileExtension} is not allowed`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Generate secure API key
export function generateAPIKey(): string {
  return `gl_${generateSecureToken(SECURITY_CONFIG.API_KEY_LENGTH)}`
}

// Hash API key for storage
export function hashAPIKey(apiKey: string): string {
  return crypto.createHash(SECURITY_CONFIG.HASH_ALGORITHM).update(apiKey).digest('hex')
}

// Validate API key format
export function validateAPIKeyFormat(apiKey: string): boolean {
  return /^gl_[a-f0-9]{64}$/.test(apiKey)
}

// Security audit logging
export function logSecurityEvent(
  event: string,
  userId?: string,
  ipAddress?: string,
  details?: any
): void {
  if (!SECURITY_CONFIG.LOG_SECURITY_EVENTS) return
  
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    userId,
    ipAddress,
    details,
    severity: 'info'
  }
  
  // In production, send to security monitoring service
  console.log('SECURITY EVENT:', logEntry)
}

// Rate limiting helper
export function createRateLimiter(
  windowMs: number = SECURITY_CONFIG.API_RATE_LIMIT_WINDOW_MS,
  maxRequests: number = SECURITY_CONFIG.API_MAX_REQUESTS_PER_WINDOW
) {
  const store = new Map<string, { count: number; resetTime: number }>()
  
  return function checkRateLimit(identifier: string): boolean {
    const now = Date.now()
    const record = store.get(identifier)
    
    if (!record || now > record.resetTime) {
      store.set(identifier, { count: 1, resetTime: now + windowMs })
      return true
    }
    
    if (record.count >= maxRequests) {
      return false
    }
    
    record.count++
    return true
  }
}

// IP address validation
export function isValidIPAddress(ip: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip)
}

// Extract client IP from request
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    const ips = forwarded.split(',').map(ip => ip.trim())
    return ips[0]
  }
  
  if (realIP) return realIP
  if (cfConnectingIP) return cfConnectingIP
  
  return request.ip || 'unknown'
}

// Check if request is from trusted source
export function isTrustedSource(ip: string, trustedIPs: string[]): boolean {
  return trustedIPs.some(trustedIP => {
    if (trustedIP.includes('/')) {
      // CIDR notation
      return isIPInCIDR(ip, trustedIP)
    }
    return ip === trustedIP
  })
}

// Check if IP is in CIDR range
function isIPInCIDR(ip: string, cidr: string): boolean {
  try {
    const [network, bits] = cidr.split('/')
    const mask = ~((1 << (32 - parseInt(bits))) - 1)
    const ipNum = ipToNumber(ip)
    const networkNum = ipToNumber(network)
    
    return (ipNum & mask) === (networkNum & mask)
  } catch {
    return false
  }
}

// Convert IP to number
function ipToNumber(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0
}
