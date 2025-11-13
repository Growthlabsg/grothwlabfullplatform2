import { NextRequest } from 'next/server';
import { SecurityMiddleware, securityConfigs, getModuleSecurityConfig } from '@/lib/security-middleware';
import { enterpriseSecurity } from '@/lib/enterprise-security';
import { Permission, UserRole } from '@/types/auth';

// Mock NextAuth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn()
}));

// Mock enterprise security
jest.mock('@/lib/enterprise-security', () => ({
  enterpriseSecurity: {
    validateSession: jest.fn(),
    checkLoginAttempts: jest.fn(),
    logSecurityEvent: jest.fn()
  }
}));

describe('Security Middleware - GrowthLab Platform', () => {
  let mockRequest: NextRequest;
  let mockSession: any;

  beforeEach(() => {
    mockRequest = new NextRequest('https://growthlab.sg/api/test', {
      method: 'GET',
      headers: {
        'user-agent': 'Test Browser',
        'x-forwarded-for': '192.168.1.1'
      }
    });

    mockSession = {
      user: {
        id: 'user123',
        email: 'test@growthlab.sg',
        role: 'startup'
      }
    };

    // Reset mocks
    jest.clearAllMocks();
  });

  describe('Platform Module Security Configurations', () => {
    test('should apply correct security for User Management module', async () => {
      const config = getModuleSecurityConfig('userManagement');
      
      expect(config.requireAuth).toBe(true);
      expect(config.requireMFA).toBe(true);
      expect(config.allowedRoles).toContain('admin');
      expect(config.auditLog).toBe(true);
      expect(config.rateLimit).toBe(true);
    });

    test('should apply correct security for Communication module', async () => {
      const config = getModuleSecurityConfig('communication');
      
      expect(config.requireAuth).toBe(true);
      expect(config.auditLog).toBe(true);
      expect(config.rateLimit).toBe(true);
      expect(config.allowedPermissions).toContain('view:communication');
    });

    test('should apply correct security for Co-Founder Matching module', async () => {
      const config = getModuleSecurityConfig('coFounderMatching');
      
      expect(config.requireAuth).toBe(true);
      expect(config.allowedRoles).toContain('startup');
      expect(config.allowedRoles).toContain('investor');
      expect(config.allowedRoles).toContain('mentor');
    });

    test('should apply correct security for Funding module', async () => {
      const config = getModuleSecurityConfig('funding');
      
      expect(config.requireAuth).toBe(true);
      expect(config.allowedRoles).toContain('startup');
      expect(config.allowedRoles).toContain('investor');
      expect(config.allowedRoles).toContain('admin');
    });

    test('should apply correct security for GrowthStarter module', async () => {
      const config = getModuleSecurityConfig('growthStarter');
      
      expect(config.requireAuth).toBe(true);
      expect(config.allowedPermissions).toContain('view:growthstarter');
      expect(config.allowedPermissions).toContain('create:growthstarter');
    });

    test('should apply correct security for Business Development module', async () => {
      const config = getModuleSecurityConfig('businessDevelopment');
      
      expect(config.requireAuth).toBe(true);
      expect(config.allowedRoles).toContain('startup');
      expect(config.allowedRoles).toContain('mentor');
    });

    test('should apply correct security for Network module', async () => {
      const config = getModuleSecurityConfig('network');
      
      expect(config.requireAuth).toBe(true);
      expect(config.rateLimit).toBe(true);
      expect(config.allowedPermissions).toContain('view:network');
    });

    test('should apply correct security for Events module', async () => {
      const config = getModuleSecurityConfig('events');
      
      expect(config.requireAuth).toBe(true);
      expect(config.allowedRoles).toContain('admin');
      expect(config.allowedRoles).toContain('accelerator');
      expect(config.allowedRoles).toContain('corporate');
      expect(config.allowedRoles).toContain('government');
    });

    test('should apply correct security for Resources module', async () => {
      const config = getModuleSecurityConfig('resources');
      
      expect(config.requireAuth).toBe(true);
      expect(config.allowedPermissions).toContain('view:resources');
      expect(config.allowedPermissions).toContain('create:resources');
    });

    test('should apply correct security for Courses module', async () => {
      const config = getModuleSecurityConfig('courses');
      
      expect(config.requireAuth).toBe(true);
      expect(config.allowedRoles).toContain('teacher');
      expect(config.allowedRoles).toContain('admin');
      expect(config.allowedRoles).toContain('mentor');
    });

    test('should apply correct security for Mentorship module', async () => {
      const config = getModuleSecurityConfig('mentorship');
      
      expect(config.requireAuth).toBe(true);
      expect(config.allowedRoles).toContain('startup');
      expect(config.allowedRoles).toContain('mentor');
    });

    test('should apply correct security for Jobs module', async () => {
      const config = getModuleSecurityConfig('jobs');
      
      expect(config.requireAuth).toBe(true);
      expect(config.rateLimit).toBe(true);
      expect(config.allowedPermissions).toContain('view:jobs');
      expect(config.allowedPermissions).toContain('create:jobs');
    });

    test('should apply correct security for Feed module', async () => {
      const config = getModuleSecurityConfig('feed');
      
      expect(config.requireAuth).toBe(true);
      expect(config.rateLimit).toBe(true);
      expect(config.allowedPermissions).toContain('view:feed');
      expect(config.allowedPermissions).toContain('create:feed');
    });

    test('should apply correct security for Files module', async () => {
      const config = getModuleSecurityConfig('files');
      
      expect(config.requireAuth).toBe(true);
      expect(config.requireMFA).toBe(true);
      expect(config.allowedPermissions).toContain('view:files');
      expect(config.allowedPermissions).toContain('create:files');
    });

    test('should apply correct security for Admin module', async () => {
      const config = getModuleSecurityConfig('admin');
      
      expect(config.requireAuth).toBe(true);
      expect(config.requireMFA).toBe(true);
      expect(config.allowedRoles).toContain('admin');
      expect(config.allowedRoles).toContain('super.admin');
    });

    test('should apply correct security for Enterprise module', async () => {
      const config = getModuleSecurityConfig('enterprise');
      
      expect(config.requireAuth).toBe(true);
      expect(config.requireMFA).toBe(true);
      expect(config.allowedRoles).toContain('admin');
      expect(config.allowedRoles).toContain('corporate');
      expect(config.allowedRoles).toContain('government');
    });
  });

  describe('Security Features by Platform Module', () => {
    test('should handle Communication Hub security correctly', async () => {
      const { getServerSession } = require('next-auth');
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        module: 'communication' as const,
        requireAuth: true,
        auditLog: true,
        rateLimit: true
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      // Should pass through (no security rejection)
      expect(result).toBeNull();
    });

    test('should handle Funding Platform security correctly', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'investor';
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        module: 'funding' as const,
        requireAuth: true,
        auditLog: true
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      // Should pass through for investor role
      expect(result).toBeNull();
    });

    test('should handle Co-Founder Matching security correctly', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'startup';
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        module: 'coFounderMatching' as const,
        requireAuth: true,
        auditLog: true
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      // Should pass through for startup role
      expect(result).toBeNull();
    });

    test('should handle Learning Platform security correctly', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'teacher';
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        module: 'courses' as const,
        requireAuth: true,
        auditLog: true
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      // Should pass through for teacher role
      expect(result).toBeNull();
    });

    test('should handle Job Marketplace security correctly', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'startup';
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        module: 'jobs' as const,
        requireAuth: true,
        auditLog: true,
        rateLimit: true
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      // Should pass through for startup role
      expect(result).toBeNull();
    });

    test('should handle File Management security correctly', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'admin';
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        module: 'files' as const,
        requireAuth: true,
        requireMFA: true,
        auditLog: true
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      // Should pass through for admin role with MFA
      expect(result).toBeNull();
    });
  });

  describe('Role-based Access Control', () => {
    test('should allow startup access to appropriate modules', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'startup';
      getServerSession.mockResolvedValue(mockSession);

      const startupModules = ['coFounderMatching', 'funding', 'growthStarter', 'businessDevelopment', 'network', 'mentorship', 'jobs', 'feed'];
      
      for (const module of startupModules) {
        const config = { module: module as keyof typeof getModuleSecurityConfig };
        const result = await SecurityMiddleware.apply(mockRequest, config);
        expect(result).toBeNull(); // Should pass through
      }
    });

    test('should allow investor access to appropriate modules', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'investor';
      getServerSession.mockResolvedValue(mockSession);

      const investorModules = ['coFounderMatching', 'funding', 'growthStarter', 'network', 'events'];
      
      for (const module of investorModules) {
        const config = { module: module as keyof typeof getModuleSecurityConfig };
        const result = await SecurityMiddleware.apply(mockRequest, config);
        expect(result).toBeNull(); // Should pass through
      }
    });

    test('should allow mentor access to appropriate modules', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'mentor';
      getServerSession.mockResolvedValue(mockSession);

      const mentorModules = ['coFounderMatching', 'businessDevelopment', 'network', 'courses', 'mentorship'];
      
      for (const module of mentorModules) {
        const config = { module: module as keyof typeof getModuleSecurityConfig };
        const result = await SecurityMiddleware.apply(mockRequest, config);
        expect(result).toBeNull(); // Should pass through
      }
    });

    test('should allow admin access to all modules', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'admin';
      getServerSession.mockResolvedValue(mockSession);

      const allModules = [
        'userManagement', 'communication', 'coFounderMatching', 'funding', 
        'growthStarter', 'businessDevelopment', 'network', 'events', 
        'resources', 'courses', 'mentorship', 'jobs', 'feed', 'files', 'admin', 'enterprise'
      ];
      
      for (const module of allModules) {
        const config = { module: module as keyof typeof getModuleSecurityConfig };
        const result = await SecurityMiddleware.apply(mockRequest, config);
        expect(result).toBeNull(); // Should pass through
      }
    });
  });

  describe('Permission-based Access Control', () => {
    test('should validate communication permissions correctly', async () => {
      const { getServerSession } = require('next-auth');
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        requireAuth: true,
        allowedPermissions: ['view:communication', 'create:communication'] as Permission[]
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      // Should pass through if user has permissions
      expect(result).toBeNull();
    });

    test('should validate funding permissions correctly', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'investor';
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        requireAuth: true,
        allowedPermissions: ['view:funding', 'create:funding', 'edit:funding'] as Permission[]
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      // Should pass through for investor with funding permissions
      expect(result).toBeNull();
    });

    test('should validate file permissions correctly', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'admin';
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        requireAuth: true,
        requireMFA: true,
        allowedPermissions: ['view:files', 'create:files', 'edit:files', 'delete:files'] as Permission[]
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      // Should pass through for admin with file permissions
      expect(result).toBeNull();
    });
  });

  describe('Enhanced Security Features', () => {
    test('should handle sensitive data protection', async () => {
      const { getServerSession } = require('next-auth');
      getServerSession.mockResolvedValue(mockSession);

      const sensitiveRequest = new NextRequest('https://growthlab.sg/api/password/reset', {
        method: 'POST',
        headers: {
          'user-agent': 'Test Browser',
          'x-forwarded-for': '192.168.1.1'
        }
      });

      const config = {
        requireAuth: true,
        sensitiveData: true
      };

      const result = await SecurityMiddleware.apply(sensitiveRequest, config);
      
      // Should require additional verification for sensitive data
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });

    test('should handle file upload security', async () => {
      const { getServerSession } = require('next-auth');
      getServerSession.mockResolvedValue(mockSession);

      const fileUploadRequest = new NextRequest('https://growthlab.sg/api/files/upload', {
        method: 'POST',
        headers: {
          'user-agent': 'Test Browser',
          'x-forwarded-for': '192.168.1.1',
          'content-type': 'multipart/form-data',
          'content-length': '52428800' // 50MB
        }
      });

      const config = {
        requireAuth: true,
        fileUpload: true
      };

      const result = await SecurityMiddleware.apply(fileUploadRequest, config);
      
      // Should reject oversized files
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });

    test('should handle MFA requirements correctly', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = 'admin';
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        requireAuth: true,
        requireMFA: true,
        module: 'admin' as const
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      // Should require MFA for admin operations
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });
  });

  describe('Rate Limiting and DDoS Protection', () => {
    test('should apply rate limiting to communication modules', async () => {
      const { getServerSession } = require('next-auth');
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        module: 'communication' as const,
        rateLimit: true
      };

      // First request should pass
      const result1 = await SecurityMiddleware.apply(mockRequest, config);
      expect(result1).toBeNull();

      // Multiple rapid requests should be rate limited
      for (let i = 0; i < 150; i++) {
        const result = await SecurityMiddleware.apply(mockRequest, config);
        if (result) {
          expect(result.status).toBe(429);
          break;
        }
      }
    });

    test('should apply rate limiting to job marketplace', async () => {
      const { getServerSession } = require('next-auth');
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        module: 'jobs' as const,
        rateLimit: true
      };

      // First request should pass
      const result1 = await SecurityMiddleware.apply(mockRequest, config);
      expect(result1).toBeNull();

      // Multiple rapid requests should be rate limited
      for (let i = 0; i < 150; i++) {
        const result = await SecurityMiddleware.apply(mockRequest, config);
        if (result) {
          expect(result.status).toBe(429);
          break;
        }
      }
    });
  });

  describe('Audit Logging and Compliance', () => {
    test('should log security events for all modules', async () => {
      const { getServerSession } = require('next-auth');
      getServerSession.mockResolvedValue(mockSession);

      const modules = [
        'communication', 'funding', 'coFounderMatching', 'growthStarter',
        'businessDevelopment', 'network', 'events', 'resources', 'courses',
        'mentorship', 'jobs', 'feed', 'files', 'admin', 'enterprise'
      ];

      for (const module of modules) {
        const config = { module: module as keyof typeof getModuleSecurityConfig };
        await SecurityMiddleware.apply(mockRequest, config);
      }

      // Verify that security events were logged
      expect(enterpriseSecurity.logSecurityEvent).toHaveBeenCalledTimes(modules.length);
    });

    test('should log sensitive data access attempts', async () => {
      const { getServerSession } = require('next-auth');
      getServerSession.mockResolvedValue(mockSession);

      const sensitiveRequest = new NextRequest('https://growthlab.sg/api/credit-card/update', {
        method: 'POST',
        headers: {
          'user-agent': 'Test Browser',
          'x-forwarded-for': '192.168.1.1'
        }
      });

      const config = {
        requireAuth: true,
        sensitiveData: true,
        auditLog: true
      };

      await SecurityMiddleware.apply(sensitiveRequest, config);

      // Verify that sensitive data access was logged
      expect(enterpriseSecurity.logSecurityEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          event: 'API_REQUEST',
          severity: 'INFO'
        })
      );
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle missing user session gracefully', async () => {
      const { getServerSession } = require('next-auth');
      getServerSession.mockResolvedValue(null);

      const config = {
        requireAuth: true,
        module: 'communication' as const
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      expect(result).not.toBeNull();
      expect(result?.status).toBe(401);
    });

    test('should handle missing user role gracefully', async () => {
      const { getServerSession } = require('next-auth');
      mockSession.user.role = undefined;
      getServerSession.mockResolvedValue(mockSession);

      const config = {
        requireAuth: true,
        allowedRoles: ['admin'] as UserRole[],
        module: 'admin' as const
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      expect(result).not.toBeNull();
      expect(result?.status).toBe(403);
    });

    test('should handle enterprise security errors gracefully', async () => {
      const { getServerSession } = require('next-auth');
      getServerSession.mockRejectedValue(new Error('Enterprise security error'));

      const config = {
        requireAuth: true,
        module: 'communication' as const
      };

      const result = await SecurityMiddleware.apply(mockRequest, config);
      
      expect(result).not.toBeNull();
      expect(result?.status).toBe(500);
    });
  });
}); 