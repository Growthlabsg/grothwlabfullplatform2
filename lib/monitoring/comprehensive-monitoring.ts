"use client"

import { redisCacheService } from '../caching/redis-cache-service'

// Comprehensive monitoring service for production-scale applications
interface MetricData {
  timestamp: number
  value: number
  labels?: Record<string, string>
}

interface AlertRule {
  metricName: string
  condition: 'gt' | 'lt' | 'eq' | 'gte' | 'lte'
  threshold: number
  duration: number // Alert if condition persists for this duration (ms)
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
}

interface Alert {
  id: string
  rule: AlertRule
  triggeredAt: number
  acknowledged: boolean
  resolvedAt?: number
  value: number
}

export class ComprehensiveMonitoringService {
  private metrics = new Map<string, MetricData[]>()
  private alerts = new Map<string, Alert>()
  private alertRules: AlertRule[] = []
  private readonly maxMetricHistory = 10000 // Keep last 10k data points per metric
  private readonly metricRetentionMs = 24 * 60 * 60 * 1000 // 24 hours

  constructor() {
    this.initializeDefaultAlertRules()
    this.startMetricCleanup()
    this.startAlertEvaluation()
  }

  // Initialize default alert rules for platform monitoring
  private initializeDefaultAlertRules() {
    this.alertRules = [
      // Response time alerts
      {
        metricName: 'http_request_duration_ms',
        condition: 'gt',
        threshold: 1000,
        duration: 5 * 60 * 1000, // 5 minutes
        severity: 'medium',
        message: 'HTTP response time is high (>1s for 5 minutes)'
      },
      {
        metricName: 'http_request_duration_ms',
        condition: 'gt',
        threshold: 5000,
        duration: 60 * 1000, // 1 minute
        severity: 'critical',
        message: 'HTTP response time is critical (>5s for 1 minute)'
      },

      // Error rate alerts
      {
        metricName: 'http_error_rate_percent',
        condition: 'gt',
        threshold: 5,
        duration: 2 * 60 * 1000, // 2 minutes
        severity: 'medium',
        message: 'HTTP error rate is high (>5% for 2 minutes)'
      },
      {
        metricName: 'http_error_rate_percent',
        condition: 'gt',
        threshold: 15,
        duration: 30 * 1000, // 30 seconds
        severity: 'critical',
        message: 'HTTP error rate is critical (>15% for 30 seconds)'
      },

      // Database alerts
      {
        metricName: 'db_connection_pool_usage_percent',
        condition: 'gt',
        threshold: 80,
        duration: 5 * 60 * 1000, // 5 minutes
        severity: 'medium',
        message: 'Database connection pool usage is high (>80%)'
      },
      {
        metricName: 'db_query_duration_ms',
        condition: 'gt',
        threshold: 5000,
        duration: 60 * 1000, // 1 minute
        severity: 'high',
        message: 'Database query duration is high (>5s)'
      },

      // Memory and CPU alerts
      {
        metricName: 'memory_usage_percent',
        condition: 'gt',
        threshold: 85,
        duration: 5 * 60 * 1000, // 5 minutes
        severity: 'high',
        message: 'Memory usage is high (>85% for 5 minutes)'
      },
      {
        metricName: 'cpu_usage_percent',
        condition: 'gt',
        threshold: 80,
        duration: 5 * 60 * 1000, // 5 minutes
        severity: 'medium',
        message: 'CPU usage is high (>80% for 5 minutes)'
      },

      // Real-time features alerts
      {
        metricName: 'websocket_connections',
        condition: 'gt',
        threshold: 50000,
        duration: 60 * 1000, // 1 minute
        severity: 'medium',
        message: 'WebSocket connections approaching limit (>50k)'
      },
      {
        metricName: 'redis_connection_failures',
        condition: 'gt',
        threshold: 10,
        duration: 60 * 1000, // 1 minute
        severity: 'high',
        message: 'Redis connection failures detected'
      }
    ]
  }

  // Record a metric data point
  recordMetric(name: string, value: number, labels?: Record<string, string>) {
    const timestamp = Date.now()
    const dataPoint: MetricData = { timestamp, value, labels }

    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }

    const metricHistory = this.metrics.get(name)!
    metricHistory.push(dataPoint)

    // Keep only recent data points
    if (metricHistory.length > this.maxMetricHistory) {
      metricHistory.shift()
    }

    // Also store in Redis for persistence and sharing across instances
    this.storeMetricInCache(name, dataPoint)
  }

  // Store metric in Redis cache for persistence
  private async storeMetricInCache(name: string, dataPoint: MetricData) {
    try {
      const key = `metrics:${name}:${Math.floor(dataPoint.timestamp / 60000)}` // Group by minute
      await redisCacheService.set(key, dataPoint, 3600) // 1 hour TTL
    } catch (error) {
      console.error('Failed to store metric in cache:', error)
    }
  }

  // Get metric data for a time range
  getMetric(name: string, startTime?: number, endTime?: number): MetricData[] {
    const metricHistory = this.metrics.get(name) || []
    
    if (!startTime && !endTime) {
      return metricHistory
    }

    const start = startTime || 0
    const end = endTime || Date.now()

    return metricHistory.filter(point => 
      point.timestamp >= start && point.timestamp <= end
    )
  }

  // Get aggregated metric data
  getAggregatedMetric(
    name: string, 
    aggregation: 'avg' | 'sum' | 'min' | 'max' | 'count',
    startTime?: number,
    endTime?: number
  ): number {
    const data = this.getMetric(name, startTime, endTime)
    
    if (data.length === 0) return 0

    const values = data.map(point => point.value)

    switch (aggregation) {
      case 'avg':
        return values.reduce((sum, val) => sum + val, 0) / values.length
      case 'sum':
        return values.reduce((sum, val) => sum + val, 0)
      case 'min':
        return Math.min(...values)
      case 'max':
        return Math.max(...values)
      case 'count':
        return values.length
      default:
        return 0
    }
  }

  // Record HTTP request metrics
  recordHttpRequest(duration: number, status: number, method: string, endpoint: string) {
    const labels = { method, endpoint, status: status.toString() }
    
    this.recordMetric('http_request_duration_ms', duration, labels)
    this.recordMetric('http_requests_total', 1, labels)
    
    if (status >= 400) {
      this.recordMetric('http_errors_total', 1, labels)
    }

    // Calculate error rate
    const totalRequests = this.getAggregatedMetric('http_requests_total', 'count', Date.now() - 60000)
    const errorRequests = this.getAggregatedMetric('http_errors_total', 'count', Date.now() - 60000)
    const errorRate = totalRequests > 0 ? (errorRequests / totalRequests) * 100 : 0
    
    this.recordMetric('http_error_rate_percent', errorRate)
  }

  // Record database query metrics
  recordDatabaseQuery(duration: number, query: string, success: boolean) {
    const labels = { success: success.toString() }
    
    this.recordMetric('db_query_duration_ms', duration, labels)
    this.recordMetric('db_queries_total', 1, labels)
    
    if (!success) {
      this.recordMetric('db_query_errors_total', 1, labels)
    }
  }

  // Record system resource metrics
  recordSystemMetrics() {
    const memUsage = process.memoryUsage()
    const cpuUsage = process.cpuUsage()

    // Memory metrics
    const memUsedMB = memUsage.heapUsed / 1024 / 1024
    const memTotalMB = memUsage.heapTotal / 1024 / 1024
    const memUsagePercent = (memUsedMB / memTotalMB) * 100

    this.recordMetric('memory_used_mb', memUsedMB)
    this.recordMetric('memory_total_mb', memTotalMB)
    this.recordMetric('memory_usage_percent', memUsagePercent)

    // CPU metrics (simplified - in production, use proper CPU monitoring)
    this.recordMetric('cpu_user_ms', cpuUsage.user / 1000)
    this.recordMetric('cpu_system_ms', cpuUsage.system / 1000)
  }

  // Record WebSocket connection metrics
  recordWebSocketMetrics(connections: number, messagesPerSecond: number) {
    this.recordMetric('websocket_connections', connections)
    this.recordMetric('websocket_messages_per_second', messagesPerSecond)
  }

  // Record cache metrics
  recordCacheMetrics(hits: number, misses: number, operations: number) {
    const hitRate = operations > 0 ? (hits / operations) * 100 : 0
    
    this.recordMetric('cache_hits', hits)
    this.recordMetric('cache_misses', misses)
    this.recordMetric('cache_hit_rate_percent', hitRate)
  }

  // Alert management
  addAlertRule(rule: AlertRule) {
    this.alertRules.push(rule)
  }

  removeAlertRule(metricName: string, threshold: number) {
    this.alertRules = this.alertRules.filter(
      rule => !(rule.metricName === metricName && rule.threshold === threshold)
    )
  }

  // Evaluate alerts
  private evaluateAlerts() {
    const now = Date.now()

    for (const rule of this.alertRules) {
      const recentData = this.getMetric(rule.metricName, now - rule.duration, now)
      
      if (recentData.length === 0) continue

      const shouldAlert = this.checkAlertCondition(rule, recentData, now)
      const alertId = this.generateAlertId(rule)
      const existingAlert = this.alerts.get(alertId)

      if (shouldAlert && !existingAlert) {
        // Trigger new alert
        const alert: Alert = {
          id: alertId,
          rule,
          triggeredAt: now,
          acknowledged: false,
          value: recentData[recentData.length - 1].value
        }

        this.alerts.set(alertId, alert)
        this.sendAlert(alert)
      } else if (!shouldAlert && existingAlert && !existingAlert.resolvedAt) {
        // Resolve existing alert
        existingAlert.resolvedAt = now
        this.sendAlertResolution(existingAlert)
      }
    }
  }

  // Check if alert condition is met
  private checkAlertCondition(rule: AlertRule, data: MetricData[], now: number): boolean {
    const startTime = now - rule.duration
    const relevantData = data.filter(point => point.timestamp >= startTime)
    
    if (relevantData.length === 0) return false

    // Check if condition is met for the entire duration
    return relevantData.every(point => {
      switch (rule.condition) {
        case 'gt': return point.value > rule.threshold
        case 'gte': return point.value >= rule.threshold
        case 'lt': return point.value < rule.threshold
        case 'lte': return point.value <= rule.threshold
        case 'eq': return point.value === rule.threshold
        default: return false
      }
    })
  }

  // Generate unique alert ID
  private generateAlertId(rule: AlertRule): string {
    return `${rule.metricName}_${rule.condition}_${rule.threshold}`
  }

  // Send alert notification
  private async sendAlert(alert: Alert) {
    console.error(`🚨 ALERT [${alert.rule.severity.toUpperCase()}]: ${alert.rule.message}`)
    console.error(`Value: ${alert.value}, Threshold: ${alert.rule.threshold}`)
    
    // In production, integrate with:
    // - PagerDuty
    // - Slack
    // - Email notifications
    // - SMS alerts for critical issues
    
    try {
      // Store alert in Redis for dashboard access
      await redisCacheService.set(`alerts:${alert.id}`, alert, 7 * 24 * 60 * 60) // 7 days
    } catch (error) {
      console.error('Failed to store alert:', error)
    }
  }

  // Send alert resolution notification
  private async sendAlertResolution(alert: Alert) {
    console.log(`✅ RESOLVED: ${alert.rule.message}`)
    
    try {
      // Update alert in Redis
      await redisCacheService.set(`alerts:${alert.id}`, alert, 7 * 24 * 60 * 60) // 7 days
    } catch (error) {
      console.error('Failed to update resolved alert:', error)
    }
  }

  // Get all active alerts
  getActiveAlerts(): Alert[] {
    return Array.from(this.alerts.values()).filter(alert => !alert.resolvedAt)
  }

  // Acknowledge an alert
  acknowledgeAlert(alertId: string) {
    const alert = this.alerts.get(alertId)
    if (alert) {
      alert.acknowledged = true
    }
  }

  // Get comprehensive health check
  getHealthCheck(): {
    status: 'healthy' | 'degraded' | 'unhealthy'
    checks: Array<{ name: string; status: 'pass' | 'fail'; message?: string }>
    metrics: Record<string, number>
  } {
    const now = Date.now()
    const fiveMinutesAgo = now - 5 * 60 * 1000

    const checks = [
      {
        name: 'http_response_time',
        status: this.getAggregatedMetric('http_request_duration_ms', 'avg', fiveMinutesAgo) < 1000 ? 'pass' : 'fail',
        message: 'Average response time in last 5 minutes'
      },
      {
        name: 'error_rate',
        status: this.getAggregatedMetric('http_error_rate_percent', 'avg', fiveMinutesAgo) < 5 ? 'pass' : 'fail',
        message: 'Error rate in last 5 minutes'
      },
      {
        name: 'memory_usage',
        status: this.getAggregatedMetric('memory_usage_percent', 'avg', fiveMinutesAgo) < 85 ? 'pass' : 'fail',
        message: 'Memory usage in last 5 minutes'
      }
    ]

    const failedChecks = checks.filter(check => check.status === 'fail').length
    const status = failedChecks === 0 ? 'healthy' : failedChecks <= 1 ? 'degraded' : 'unhealthy'

    const metrics = {
      avg_response_time: this.getAggregatedMetric('http_request_duration_ms', 'avg', fiveMinutesAgo),
      error_rate: this.getAggregatedMetric('http_error_rate_percent', 'avg', fiveMinutesAgo),
      memory_usage: this.getAggregatedMetric('memory_usage_percent', 'avg', fiveMinutesAgo),
      active_alerts: this.getActiveAlerts().length
    }

    return { status, checks, metrics }
  }

  // Performance dashboard data
  getDashboardData(timeRange: number = 60 * 60 * 1000) { // Default 1 hour
    const now = Date.now()
    const startTime = now - timeRange

    return {
      overview: {
        totalRequests: this.getAggregatedMetric('http_requests_total', 'count', startTime),
        averageResponseTime: this.getAggregatedMetric('http_request_duration_ms', 'avg', startTime),
        errorRate: this.getAggregatedMetric('http_error_rate_percent', 'avg', startTime),
        activeConnections: this.getAggregatedMetric('websocket_connections', 'max', startTime)
      },
      charts: {
        responseTime: this.getMetric('http_request_duration_ms', startTime),
        errorRate: this.getMetric('http_error_rate_percent', startTime),
        memoryUsage: this.getMetric('memory_usage_percent', startTime),
        connections: this.getMetric('websocket_connections', startTime)
      },
      alerts: this.getActiveAlerts()
    }
  }

  // Cleanup old metrics
  private cleanupMetrics() {
    const cutoffTime = Date.now() - this.metricRetentionMs

    for (const [name, data] of this.metrics.entries()) {
      const filteredData = data.filter(point => point.timestamp > cutoffTime)
      this.metrics.set(name, filteredData)
    }
  }

  // Start background processes
  private startMetricCleanup() {
    // Clean up old metrics every hour
    setInterval(() => {
      this.cleanupMetrics()
    }, 60 * 60 * 1000)
  }

  private startAlertEvaluation() {
    // Evaluate alerts every 30 seconds
    setInterval(() => {
      this.evaluateAlerts()
    }, 30 * 1000)
  }

  // Record system metrics every minute
  startSystemMonitoring() {
    setInterval(() => {
      this.recordSystemMetrics()
    }, 60 * 1000)
  }
}

// Singleton instance
export const monitoringService = new ComprehensiveMonitoringService()

// Start system monitoring automatically
monitoringService.startSystemMonitoring()
