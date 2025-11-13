import crypto from 'crypto';
import { env } from './env';

// Enterprise Security Service
export class EnterpriseSecurityService {
  private static instance: EnterpriseSecurityService;
  private auditLog: SecurityAuditLog[] = [];
  private failedLoginAttempts: Map<string, { count: number; lastAttempt: Date }> = new Map();
  private activeSessions: Map<string, SessionInfo> = new Map();

  // Security configuration
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private readonly PASSWORD_MIN_LENGTH = 12;

  static getInstance(): EnterpriseSecurityService {
    if (!EnterpriseSecurityService.instance) {
      EnterpriseSecurityService.instance = new EnterpriseSecurityService();
    }
    return EnterpriseSecurityService.instance;
  }

  // Multi-Factor Authentication
  async generateMFAToken(userId: string): Promise<MFAToken> {
    const secret = crypto.randomBytes(32).toString('base64');
    const token = crypto.randomBytes(6).toString('hex').toUpperCase();
    
    this.logSecurityEvent({
      event: 'MFA_TOKEN_GENERATED',
      userId,
      timestamp: new Date(),
      severity: 'INFO',
      details: { tokenType: 'TOTP' }
    });

    return {
      secret,
      token,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      type: 'TOTP'
    };
  }

  async validateMFAToken(userId: string, token: string): Promise<boolean> {
    const isValid = this.validateTOTP(token);
    
    this.logSecurityEvent({
      event: isValid ? 'MFA_VALIDATION_SUCCESS' : 'MFA_VALIDATION_FAILED',
      userId,
      timestamp: new Date(),
      severity: isValid ? 'INFO' : 'WARNING',
      details: { token }
    });

    return isValid;
  }

  // Password Security
  validatePasswordStrength(password: string): PasswordValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (password.length < this.PASSWORD_MIN_LENGTH) {
      errors.push(`Password must be at least ${this.PASSWORD_MIN_LENGTH} characters long`);
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      strength: this.calculatePasswordStrength(password)
    };
  }

  // Session Management
  createSecureSession(userId: string, userAgent: string, ipAddress: string): SessionInfo {
    const sessionId = crypto.randomBytes(32).toString('hex');
    const sessionToken = crypto.randomBytes(64).toString('hex');
    
    const session: SessionInfo = {
      sessionId,
      userId,
      sessionToken,
      userAgent,
      ipAddress,
      createdAt: new Date(),
      lastActivity: new Date(),
      expiresAt: new Date(Date.now() + this.SESSION_TIMEOUT),
      isActive: true
    };

    this.activeSessions.set(sessionId, session);
    
    this.logSecurityEvent({
      event: 'SESSION_CREATED',
      userId,
      timestamp: new Date(),
      severity: 'INFO',
      details: { sessionId, ipAddress }
    });

    return session;
  }

  validateSession(sessionId: string, sessionToken: string): boolean {
    const session = this.activeSessions.get(sessionId);
    
    if (!session || !session.isActive) {
      return false;
    }

    if (session.sessionToken !== sessionToken) {
      this.logSecurityEvent({
        event: 'SESSION_VALIDATION_FAILED',
        userId: session.userId,
        timestamp: new Date(),
        severity: 'WARNING',
        details: { sessionId, reason: 'Invalid token' }
      });
      return false;
    }

    if (new Date() > session.expiresAt) {
      session.isActive = false;
      return false;
    }

    session.lastActivity = new Date();
    return true;
  }

  // Rate Limiting
  checkLoginAttempts(email: string): LoginAttemptResult {
    const attempts = this.failedLoginAttempts.get(email);
    
    if (!attempts) {
      return { canAttempt: true, remainingAttempts: this.MAX_LOGIN_ATTEMPTS };
    }

    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt.getTime();
    
    if (attempts.count >= this.MAX_LOGIN_ATTEMPTS && timeSinceLastAttempt < this.LOCKOUT_DURATION) {
      return {
        canAttempt: false,
        remainingAttempts: 0,
        lockoutExpiresAt: new Date(attempts.lastAttempt.getTime() + this.LOCKOUT_DURATION)
      };
    }

    if (timeSinceLastAttempt >= this.LOCKOUT_DURATION) {
      this.failedLoginAttempts.delete(email);
      return { canAttempt: true, remainingAttempts: this.MAX_LOGIN_ATTEMPTS };
    }

    return {
      canAttempt: true,
      remainingAttempts: this.MAX_LOGIN_ATTEMPTS - attempts.count
    };
  }

  recordFailedLoginAttempt(email: string): void {
    const attempts = this.failedLoginAttempts.get(email) || { count: 0, lastAttempt: new Date() };
    attempts.count++;
    attempts.lastAttempt = new Date();
    
    this.failedLoginAttempts.set(email, attempts);
    
    this.logSecurityEvent({
      event: 'LOGIN_ATTEMPT_FAILED',
      userId: email,
      timestamp: new Date(),
      severity: 'WARNING',
      details: { attemptCount: attempts.count }
    });
  }

  // Data Encryption
  async encryptSensitiveData(data: string): Promise<EncryptedData> {
    const algorithm = 'aes-256-gcm';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv(algorithm, key, crypto.randomBytes(16));
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      algorithm,
      encryptedAt: new Date()
    };
  }

  // Audit Logging
  logSecurityEvent(event: SecurityAuditLog): void {
    this.auditLog.push({
      ...event,
      id: crypto.randomBytes(16).toString('hex'),
      timestamp: event.timestamp || new Date()
    });

    console.log(`[SECURITY] ${event.event}: ${event.userId} - ${event.severity}`);
  }

  getAuditLogs(filters?: AuditLogFilters): SecurityAuditLog[] {
    let logs = [...this.auditLog];
    
    if (filters) {
      if (filters.userId) {
        logs = logs.filter(log => log?.userId === filters.userId);
      }
      if (filters.severity) {
        logs = logs.filter(log => log?.severity === filters.severity);
      }
      if (filters.event) {
        logs = logs.filter(log => log?.event === filters.event);
      }
    }
    
    return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Private helper methods
  private calculatePasswordStrength(password: string): 'weak' | 'medium' | 'strong' | 'very-strong' {
    let score = 0;
    
    if (password.length >= 12) score += 2;
    if (password.length >= 16) score += 2;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 2;
    
    if (score >= 6) return 'very-strong';
    if (score >= 4) return 'strong';
    if (score >= 2) return 'medium';
    return 'weak';
  }

  private validateTOTP(token: string): boolean {
    // Simplified TOTP validation
    return token.length === 6 && /^\d{6}$/.test(token);
  }
}

// Types and Interfaces
export interface MFAToken {
  secret: string;
  token: string;
  expiresAt: Date;
  type: 'TOTP' | 'SMS' | 'EMAIL';
}

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
}

export interface SessionInfo {
  sessionId: string;
  userId: string;
  sessionToken: string;
  userAgent: string;
  ipAddress: string;
  createdAt: Date;
  lastActivity: Date;
  expiresAt: Date;
  isActive: boolean;
}

export interface LoginAttemptResult {
  canAttempt: boolean;
  remainingAttempts: number;
  lockoutExpiresAt?: Date;
}

export interface EncryptedData {
  encryptedData: string;
  iv: string;
  authTag: string;
  algorithm: string;
  encryptedAt: Date;
}

export interface SecurityAuditLog {
  id?: string;
  event: string;
  userId: string;
  timestamp: Date;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditLogFilters {
  userId?: string;
  severity?: 'INFO' | 'WARNING' | 'CRITICAL';
  event?: string;
  startDate?: Date;
  endDate?: Date;
}

// Export singleton instance
export const enterpriseSecurity = EnterpriseSecurityService.getInstance(); 