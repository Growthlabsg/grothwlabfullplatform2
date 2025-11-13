"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Download,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from "lucide-react"

interface PaymentDashboardProps {
  stripeAccountId?: string
  onSetupAccount: () => void
}

export function PaymentDashboard({ stripeAccountId, onSetupAccount }: PaymentDashboardProps) {
  const [accountStatus, setAccountStatus] = useState<'pending' | 'active' | 'restricted' | null>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    thisMonth: 0,
    totalEvents: 0,
    activeEvents: 0
  })

  useEffect(() => {
    // Simulate loading account status and data
    if (stripeAccountId) {
      setAccountStatus('active')
      setTransactions([
        {
          id: 'txn_1',
          eventName: 'Basketball Tournament',
          amount: 2500,
          currency: 'usd',
          status: 'completed',
          date: '2024-01-15',
          participants: 25
        },
        {
          id: 'txn_2',
          eventName: 'Tennis Meet',
          amount: 1200,
          currency: 'usd',
          status: 'pending',
          date: '2024-01-14',
          participants: 12
        },
        {
          id: 'txn_3',
          eventName: 'Soccer League',
          amount: 5000,
          currency: 'usd',
          status: 'completed',
          date: '2024-01-10',
          participants: 50
        }
      ])
      setStats({
        totalRevenue: 8700,
        thisMonth: 3700,
        totalEvents: 15,
        activeEvents: 3
      })
    }
  }, [stripeAccountId])

  if (!stripeAccountId) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-8 w-8 text-gray-400" />
          </div>
          <CardTitle>No Payment Account</CardTitle>
          <CardDescription>
            Set up your Stripe account to start accepting payments for your events
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={onSetupAccount} className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            Set Up Payment Account
          </Button>
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  return (
    <div className="space-y-6">
      {/* Account Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Payment Account</CardTitle>
                <CardDescription>Stripe Account Status</CardDescription>
              </div>
            </div>
            <Badge variant={accountStatus === 'active' ? 'default' : 'secondary'}>
              {accountStatus === 'active' ? 'Active' : 'Pending'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue, 'usd')}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.thisMonth, 'usd')}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold">{stats.totalEvents}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Events</p>
                <p className="text-2xl font-bold">{stats.activeEvents}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your payment history and event revenue</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <h4 className="font-medium">{transaction.eventName}</h4>
                        <p className="text-sm text-gray-600">
                          {transaction.participants} participants • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(transaction.amount, transaction.currency)}</p>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                {transactions.filter(t => t.status === 'completed').map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <h4 className="font-medium">{transaction.eventName}</h4>
                        <p className="text-sm text-gray-600">
                          {transaction.participants} participants • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(transaction.amount, transaction.currency)}</p>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-4">
              <div className="space-y-4">
                {transactions.filter(t => t.status === 'pending').map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <h4 className="font-medium">{transaction.eventName}</h4>
                        <p className="text-sm text-gray-600">
                          {transaction.participants} participants • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(transaction.amount, transaction.currency)}</p>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="failed" className="mt-4">
              <div className="text-center py-8">
                <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No failed transactions</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
