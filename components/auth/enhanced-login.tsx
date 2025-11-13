"use client"

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { enterpriseSecurity } from '@/lib/enterprise-security';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Shield, Lock, Eye, EyeOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoginFormData {
  email: string;
  password: string;
  mfaToken: string;
}

export function EnhancedLogin() {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    mfaToken: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutExpires, setLockoutExpires] = useState<Date | null>(null);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: 'Very Weak',
    color: 'bg-red-500'
  });

  useEffect(() => {
    if (formData.password) {
      const validation = enterpriseSecurity.validatePasswordStrength(formData.password);
      const score = validation.errors.length === 0 ? 5 : 5 - validation.errors.length;
      let label = 'Very Weak';
      let color = 'bg-red-500';

      if (score >= 5) {
        label = 'Very Strong';
        color = 'bg-green-500';
      } else if (score >= 4) {
        label = 'Strong';
        color = 'bg-green-400';
      } else if (score >= 3) {
        label = 'Medium';
        color = 'bg-yellow-500';
      } else if (score >= 2) {
        label = 'Weak';
        color = 'bg-orange-500';
      }

      setPasswordStrength({ score, label, color });
    }
  }, [formData.password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) return;

    try {
      const attempts = enterpriseSecurity.checkLoginAttempts(formData.email);
      if (!attempts.canAttempt) {
        setIsLocked(true);
        setLockoutExpires(attempts.lockoutExpiresAt || null);
        return;
      }

      await login(formData.email, formData.password);
      
      if (formData.email === 'admin@growthlab.sg') {
        setShowMFA(true);
      }
    } catch (error) {
      enterpriseSecurity.recordFailedLoginAttempt(formData.email);
      const attempts = enterpriseSecurity.checkLoginAttempts(formData.email);
      if (!attempts.canAttempt) {
        setIsLocked(true);
        setLockoutExpires(attempts.lockoutExpiresAt || null);
      }
    }
  };

  const formatTimeRemaining = () => {
    if (!lockoutExpires) return '';
    const remaining = lockoutExpires.getTime() - Date.now();
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Secure Login
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          {isLocked && (
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Account temporarily locked. Please try again in {formatTimeRemaining()}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                disabled={isLocked || loading}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  disabled={isLocked || loading}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLocked || loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>

              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Password Strength:</span>
                    <span className={cn(
                      "font-medium",
                      passwordStrength.color === 'bg-green-500' && "text-green-600",
                      passwordStrength.color === 'bg-green-400' && "text-green-600",
                      passwordStrength.color === 'bg-yellow-500' && "text-yellow-600",
                      passwordStrength.color === 'bg-orange-500' && "text-orange-600",
                      passwordStrength.color === 'bg-red-500' && "text-red-600"
                    )}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <Progress value={(passwordStrength.score / 5) * 100} className="h-2" />
                </div>
              )}
            </div>

            {showMFA && (
              <div className="space-y-2">
                <label htmlFor="mfaToken" className="text-sm font-medium text-gray-700">
                  Multi-Factor Authentication
                </label>
                <Input
                  id="mfaToken"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={formData.mfaToken}
                  onChange={(e) => setFormData(prev => ({ ...prev, mfaToken: e.target.value }))}
                  maxLength={6}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500">
                  Enter the 6-digit code from your authenticator app
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLocked || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : showMFA ? (
                'Verify MFA'
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our security policies and data protection measures.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 