"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  Users, 
  Activity,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { enterpriseSecurity } from '@/lib/enterprise-security';

interface SecurityMetrics {
  totalUsers: number;
  activeSessions: number;
  failedLogins: number;
  securityEvents: number;
  mfaEnabled: number;
  lockedAccounts: number;
}

export function SecurityDashboard() {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalUsers: 0,
    activeSessions: 0,
    failedLogins: 0,
    securityEvents: 0,
    mfaEnabled: 0,
    lockedAccounts: 0
  });
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    loadSecurityData();
    const interval = setInterval(loadSecurityData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadSecurityData = async () => {
    try {
      setIsLoading(true);
      
      const mockMetrics: SecurityMetrics = {
        totalUsers: 1247,
        activeSessions: 89,
        failedLogins: 12,
        securityEvents: 156,
        mfaEnabled: 892,
        lockedAccounts: 3
      };
      
      setMetrics(mockMetrics);
      
      const events = enterpriseSecurity.getAuditLogs({
        startDate: new Date(Date.now() - 24 * 60 * 60 * 1000)
      });
      
      setRecentEvents(events.slice(0, 10));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load security data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500 text-white';
      case 'WARNING':
        return 'bg-yellow-500 text-white';
      case 'INFO':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const calculateSecurityScore = () => {
    const totalChecks = 6;
    let passedChecks = 0;
    
    if (metrics.mfaEnabled / metrics.totalUsers > 0.7) passedChecks++;
    if (metrics.failedLogins < 20) passedChecks++;
    if (metrics.lockedAccounts < 5) passedChecks++;
    if (metrics.securityEvents < 200) passedChecks++;
    if (metrics.activeSessions < 100) passedChecks++;
    if (recentEvents.filter(e => e.severity === 'CRITICAL').length === 0) passedChecks++;
    
    return Math.round((passedChecks / totalChecks) * 100);
  };

  const securityScore = calculateSecurityScore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
          <p className="text-gray-600">Monitor and manage platform security</p>
        </div>
        <Button onClick={loadSecurityData} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Overall Security Score</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {securityScore}%
              </span>
              <Badge className={securityScore >= 80 ? 'bg-green-500' : securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}>
                {securityScore >= 80 ? 'Excellent' : securityScore >= 60 ? 'Good' : 'Needs Attention'}
              </Badge>
            </div>
            <Progress value={securityScore} className="h-3" />
            <p className="text-sm text-gray-600">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeSessions}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((metrics.activeSessions / metrics.totalUsers) * 100)}% of users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MFA Enabled</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.mfaEnabled}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((metrics.mfaEnabled / metrics.totalUsers) * 100)}% adoption
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.failedLogins}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locked Accounts</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.lockedAccounts}</div>
            <p className="text-xs text-muted-foreground">
              Due to failed attempts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.securityEvents}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Recent Events</TabsTrigger>
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Events</CardTitle>
              <CardDescription>
                Latest security events and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-4 w-4" />
                      <div>
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-gray-600">
                          {event.userId} • {event.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>
                Active security alerts and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.failedLogins > 10 && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      High number of failed login attempts detected. Consider implementing additional security measures.
                    </AlertDescription>
                  </Alert>
                )}
                
                {metrics.lockedAccounts > 0 && (
                  <Alert>
                    <Lock className="h-4 w-4" />
                    <AlertDescription>
                      {metrics.lockedAccounts} account(s) are currently locked due to failed login attempts.
                    </AlertDescription>
                  </Alert>
                )}
                
                {metrics.mfaEnabled / metrics.totalUsers < 0.7 && (
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      MFA adoption rate is below 70%. Consider implementing mandatory MFA for all users.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 