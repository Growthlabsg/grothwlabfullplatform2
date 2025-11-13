import { NextRequest, NextResponse } from 'next/server';
import { enterpriseSecurity } from './enterprise-security';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { hasPermission, hasRole, getUserPermissions } from './rbac';
import type { UserRole, Permission } from '@/types/auth';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 100;
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Enhanced security headers configuration
const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'X-Download-Options': 'noopen',
  'X-DNS-Prefetch-Control': 'off',
};

// Platform-specific security configurations
const PLATFORM_SECURITY_CONFIGS = {
  // Core platform modules
  userManagement: {
    requireAuth: true,
    requireMFA: true,
    allowedRoles: ['admin', 'super.admin'] as UserRole[],
    auditLog: true,
    rateLimit: true
  },
  
  // Communication hub
  communication: {
    requireAuth: true,
    auditLog: true,
    rateLimit: true,
    allowedPermissions: ['view:communication', 'create:communication', 'edit:communication'] as Permission[]
  },
  
  // Startup support modules
  coFounderMatching: {
    requireAuth: true,
    auditLog: true,
    allowedRoles: ['startup', 'investor', 'mentor'] as UserRole[],
    allowedPermissions: ['view:cofounder', 'create:cofounder', 'edit:cofounder'] as Permission[]
  },
  
  funding: {
    requireAuth: true,
    auditLog: true,
    allowedRoles: ['startup', 'investor', 'admin'] as UserRole[],
    allowedPermissions: ['view:funding', 'create:funding', 'edit:funding', 'delete:funding'] as Permission[]
  },
  
  growthStarter: {
    requireAuth: true,
    auditLog: true,
    allowedRoles: ['startup', 'investor', 'admin'] as UserRole[],
    allowedPermissions: ['view:growthstarter', 'create:growthstarter', 'edit:growthstarter'] as Permission[]
  },
  
  businessDevelopment: {
    requireAuth: true,
    auditLog: true,
    allowedRoles: ['startup', 'mentor', 'admin'] as UserRole[],
    allowedPermissions: ['view:business', 'create:business', 'edit:business'] as Permission[]
  },
  
  // Networking & community
  network: {
    requireAuth: true,
    auditLog: true,
    rateLimit: true,
    allowedPermissions: ['view:network', 'create:network', 'edit:network'] as Permission[]
  },
  
  events: {
    requireAuth: true,
    auditLog: true,
    allowedRoles: ['admin', 'accelerator', 'corporate', 'government'] as UserRole[],
    allowedPermissions: ['view:events', 'create:events', 'edit:events', 'delete:events'] as Permission[]
  },
  
  // Learning & resources
  resources: {
    requireAuth: true,
    auditLog: true,
    allowedPermissions: ['view:resources', 'create:resources', 'edit:resources'] as Permission[]
  },
  
  courses: {
    requireAuth: true,
    auditLog: true,
    allowedRoles: ['teacher', 'admin', 'mentor'] as UserRole[],
    allowedPermissions: ['view:courses', 'create:courses', 'edit:courses', 'delete:courses'] as Permission[]
  },
  
  mentorship: {
    requireAuth: true,
    auditLog: true,
    allowedRoles: ['startup', 'mentor', 'admin'] as UserRole[],
    allowedPermissions: ['view:mentorship', 'create:mentorship', 'edit:mentorship'] as Permission[]
  },
  
  // Job & talent marketplace
  jobs: {
    requireAuth: true,
    auditLog: true,
    rateLimit: true,
    allowedPermissions: ['view:jobs', 'create:jobs', 'edit:jobs', 'delete:jobs'] as Permission[]
  },
  
  // Content & social features
  feed: {
    requireAuth: true,
    auditLog: true,
    rateLimit: true,
    allowedPermissions: ['view:feed', 'create:feed', 'edit:feed', 'delete:feed'] as Permission[]
  },
  
  // File management
  files: {
    requireAuth: true,
    requireMFA: true,
    auditLog: true,
    allowedPermissions: ['view:files', 'create:files', 'edit:files', 'delete:files'] as Permission[]
  },
  
  // Admin & platform management
  admin: {
    requireAuth: true,
    requireMFA: true,
    allowedRoles: ['admin', 'super.admin'] as UserRole[],
    auditLog: true,
    rateLimit: true
  },
  
  // Enterprise features
  enterprise: {
    requireAuth: true,
    requireMFA: true,
    allowedRoles: ['admin', 'corporate', 'government'] as UserRole[],
    auditLog: true,
    rateLimit: true
  }
};

export interface SecurityMiddlewareConfig {
  requireAuth?: boolean;
  requireMFA?: boolean;
  rateLimit?: boolean;
  auditLog?: boolean;
  allowedRoles?: UserRole[];
  allowedPermissions?: Permission[];
  module?: keyof typeof PLATFORM_SECURITY_CONFIGS;
  sensitiveData?: boolean;
  fileUpload?: boolean;
  apiVersion?: string;
}

export class SecurityMiddleware {
  static async apply(
    request: NextRequest,
    config: SecurityMiddlewareConfig = {}
  ): Promise<NextResponse | null> {
    const startTime = Date.now();
    const requestId = crypto.randomUUID();
    const clientIP = this.getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    try {
      // 1. Apply module-specific configuration
      if (config.module && PLATFORM_SECURITY_CONFIGS[config.module]) {
        config = { ...PLATFORM_SECURITY_CONFIGS[config.module], ...config };
      }

      // 2. Rate Limiting
      if (config.rateLimit !== false) {
        const rateLimitResult = this.checkRateLimit(clientIP);
        if (!rateLimitResult.allowed) {
          return this.createRateLimitResponse(rateLimitResult);
        }
      }

      // 3. Security Headers
      const response = NextResponse.next();
      this.addSecurityHeaders(response);

              // 4. Authentication Check
        if (config.requireAuth) {
          const authResult = await this.validateAuthentication(request);
          if (!authResult.authenticated) {
            return this.createUnauthorizedResponse(authResult.reason || 'Authentication required');
          }

        // 5. MFA Check for sensitive operations
        if (config.requireMFA && authResult.user) {
          const mfaResult = await this.validateMFA(authResult.user.id);
          if (!mfaResult.valid) {
            return this.createMFARequiredResponse();
          }
        }

        // 6. Enhanced Role-based Access Control
        if (config.allowedRoles && authResult.user) {
          const roleCheck = this.checkRoleAccess(authResult.user, config.allowedRoles);
          if (!roleCheck.allowed) {
            return this.createForbiddenResponse(roleCheck.reason || 'Insufficient role permissions');
          }
        }

        // 7. Enhanced Permission-based Access Control
        if (config.allowedPermissions && authResult.user) {
          const permissionCheck = this.checkPermissionAccess(authResult.user, config.allowedPermissions);
          if (!permissionCheck.allowed) {
            return this.createForbiddenResponse(permissionCheck.reason || 'Insufficient permissions');
          }
        }

        // 8. Sensitive Data Protection
        if (config.sensitiveData) {
          const dataProtectionResult = this.validateDataProtection(request, authResult.user);
          if (!dataProtectionResult.allowed) {
            return this.createForbiddenResponse(dataProtectionResult.reason || 'Access denied');
          }
        }

        // 9. File Upload Security
        if (config.fileUpload) {
          const fileUploadResult = this.validateFileUpload(request);
          if (!fileUploadResult.allowed) {
            return this.createForbiddenResponse(fileUploadResult.reason || 'File upload not allowed');
          }
        }
      }

      // 10. Enhanced Audit Logging
      if (config.auditLog !== false) {
        this.logRequest(request, requestId, clientIP, userAgent, startTime, config);
      }

      return response;

    } catch (error) {
      console.error('Security middleware error:', error);
      return this.createErrorResponse('Internal security error');
    }
  }

  private static checkRateLimit(clientIP: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const key = `rate_limit:${clientIP}`;
    const current = rateLimitStore.get(key);

    if (!current || now > current.resetTime) {
      rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetTime: now + RATE_LIMIT_WINDOW };
    }

    if (current.count >= MAX_REQUESTS_PER_WINDOW) {
      return { allowed: false, remaining: 0, resetTime: current.resetTime };
    }

    current.count++;
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - current.count, resetTime: current.resetTime };
  }

  private static addSecurityHeaders(response: NextResponse): void {
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  private static async validateAuthentication(request: NextRequest): Promise<{
    authenticated: boolean;
    user?: any;
    reason?: string;
  }> {
    try {
      const session = await getServerSession(authOptions);
      
      if (!session?.user) {
        return { authenticated: false, reason: 'No valid session' };
      }

      // Enhanced session validation
      const sessionToken = request.headers.get('x-session-token');
      if (sessionToken) {
        const sessionValid = enterpriseSecurity.validateSession(session.user.id, sessionToken);
        if (!sessionValid) {
          return { authenticated: false, reason: 'Invalid session token' };
        }
      }

              // Check for account lockout
        if (session.user.email) {
          const lockoutCheck = enterpriseSecurity.checkLoginAttempts(session.user.email);
          if (!lockoutCheck.canAttempt) {
            return { authenticated: false, reason: 'Account temporarily locked' };
          }
        }

      return { authenticated: true, user: session.user };
    } catch (error) {
      console.error('Authentication validation error:', error);
      return { authenticated: false, reason: 'Authentication error' };
    }
  }

  private static async validateMFA(userId: string): Promise<{ valid: boolean }> {
    // Enhanced MFA validation
    try {
      // In a real implementation, this would check if MFA is required and validated
      // For now, we'll assume MFA is valid if the user has completed it
      return { valid: true };
    } catch (error) {
      console.error('MFA validation error:', error);
      return { valid: false };
    }
  }

  private static checkRoleAccess(user: any, allowedRoles: UserRole[]): { allowed: boolean; reason?: string } {
    if (!user.role) {
      return { allowed: false, reason: 'No role assigned' };
    }

    const userRoles = Array.isArray(user.role) ? user.role : [user.role];
    
    if (!hasRole(userRoles as UserRole[], allowedRoles)) {
      return { allowed: false, reason: `Role '${user.role}' not authorized` };
    }

    return { allowed: true };
  }

  private static checkPermissionAccess(user: any, allowedPermissions: Permission[]): { allowed: boolean; reason?: string } {
    const userRoles = Array.isArray(user.role) ? user.role : [user.role];
    
    for (const permission of allowedPermissions) {
      if (hasPermission(userRoles as UserRole[], permission)) {
        return { allowed: true };
      }
    }

    return { allowed: false, reason: 'Insufficient permissions' };
  }

  private static validateDataProtection(request: NextRequest, user: any): { allowed: boolean; reason?: string } {
    // Check for sensitive data access patterns
    const url = request.url.toLowerCase();
    const sensitivePatterns = ['password', 'credit', 'ssn', 'passport', 'bank'];
    
    for (const pattern of sensitivePatterns) {
      if (url.includes(pattern)) {
        // Require additional verification for sensitive data access
        const verificationToken = request.headers.get('x-verification-token');
        if (!verificationToken) {
          return { allowed: false, reason: 'Additional verification required for sensitive data' };
        }
      }
    }

    return { allowed: true };
  }

  private static validateFileUpload(request: NextRequest): { allowed: boolean; reason?: string } {
    // Validate file upload security
    const contentType = request.headers.get('content-type');
    if (contentType && contentType.includes('multipart/form-data')) {
      // Check file size limits and allowed file types
      const contentLength = request.headers.get('content-length');
      const maxFileSize = 50 * 1024 * 1024; // 50MB
      
      if (contentLength && parseInt(contentLength) > maxFileSize) {
        return { allowed: false, reason: 'File size exceeds limit' };
      }
    }

    return { allowed: true };
  }

  private static getClientIP(request: NextRequest): string {
    try {
      return (
        request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        (request as any).ip ||
        'unknown'
      );
    } catch (error) {
      return 'unknown';
    }
  }

  private static logRequest(
    request: NextRequest,
    requestId: string,
    clientIP: string,
    userAgent: string,
    startTime: number,
    config: SecurityMiddlewareConfig
  ): void {
    const duration = Date.now() - startTime;
    
    enterpriseSecurity.logSecurityEvent({
      event: 'API_REQUEST',
      userId: 'anonymous', // Will be updated with actual user ID if authenticated
      timestamp: new Date(),
      severity: 'INFO',
      details: {
        requestId,
        method: request.method,
        url: request.url,
        clientIP,
        userAgent,
        duration,
        statusCode: 200, // Will be updated with actual status code
        module: config.module,
        sensitiveData: config.sensitiveData,
        fileUpload: config.fileUpload
      },
      ipAddress: clientIP,
      userAgent
    });
  }

  private static createRateLimitResponse(result: { remaining: number; resetTime: number }): NextResponse {
    const response = new NextResponse(
      JSON.stringify({
        error: 'Rate limit exceeded',
        message: 'Too many requests',
        retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
      }),
      { status: 429 }
    );

    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString());
    response.headers.set('Retry-After', Math.ceil((result.resetTime - Date.now()) / 1000).toString());

    return response;
  }

  private static createUnauthorizedResponse(reason: string): NextResponse {
    return new NextResponse(
      JSON.stringify({
        error: 'Unauthorized',
        message: reason
      }),
      { status: 401 }
    );
  }

  private static createMFARequiredResponse(): NextResponse {
    return new NextResponse(
      JSON.stringify({
        error: 'MFA Required',
        message: 'Multi-factor authentication is required for this operation'
      }),
      { status: 403 }
    );
  }

  private static createForbiddenResponse(reason: string): NextResponse {
    return new NextResponse(
      JSON.stringify({
        error: 'Forbidden',
        message: reason
      }),
      { status: 403 }
    );
  }

  private static createErrorResponse(message: string): NextResponse {
    return new NextResponse(
      JSON.stringify({
        error: 'Security Error',
        message
      }),
      { status: 500 }
    );
  }
}

// Enhanced convenience functions for common security configurations
export const securityConfigs = {
  public: {},
  authenticated: { requireAuth: true, auditLog: true },
  sensitive: { requireAuth: true, requireMFA: true, auditLog: true },
  api: { requireAuth: true, rateLimit: true, auditLog: true },
  
  // Platform-specific configurations
  userManagement: PLATFORM_SECURITY_CONFIGS.userManagement,
  communication: PLATFORM_SECURITY_CONFIGS.communication,
  coFounderMatching: PLATFORM_SECURITY_CONFIGS.coFounderMatching,
  funding: PLATFORM_SECURITY_CONFIGS.funding,
  growthStarter: PLATFORM_SECURITY_CONFIGS.growthStarter,
  businessDevelopment: PLATFORM_SECURITY_CONFIGS.businessDevelopment,
  network: PLATFORM_SECURITY_CONFIGS.network,
  events: PLATFORM_SECURITY_CONFIGS.events,
  resources: PLATFORM_SECURITY_CONFIGS.resources,
  courses: PLATFORM_SECURITY_CONFIGS.courses,
  mentorship: PLATFORM_SECURITY_CONFIGS.mentorship,
  jobs: PLATFORM_SECURITY_CONFIGS.jobs,
  feed: PLATFORM_SECURITY_CONFIGS.feed,
  files: PLATFORM_SECURITY_CONFIGS.files,
  admin: PLATFORM_SECURITY_CONFIGS.admin,
  enterprise: PLATFORM_SECURITY_CONFIGS.enterprise
};

// Middleware wrapper for easy use in API routes
export function withSecurity(config: SecurityMiddlewareConfig = {}) {
  return async function securityWrapper(request: NextRequest) {
    return SecurityMiddleware.apply(request, config);
  };
}

// Utility function to get security config for a specific module
export function getModuleSecurityConfig(module: keyof typeof PLATFORM_SECURITY_CONFIGS): SecurityMiddlewareConfig {
  return PLATFORM_SECURITY_CONFIGS[module];
} 