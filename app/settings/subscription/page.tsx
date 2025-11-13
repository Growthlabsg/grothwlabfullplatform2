"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard, 
  Settings, 
  Bell, 
  Shield, 
  Download, 
  FileText, 
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Save,
  RefreshCw,
  Trash2,
  Plus,
  Edit,
  Eye,
  EyeOff
} from "lucide-react"
import Link from "next/link"
import { useSubscription } from "@/contexts/subscription-context"
import { toast } from "sonner"

export default function SubscriptionSettingsPage() {
  const { currentTier, getAvailablePlans } = useSubscription()
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    usage: true,
    billing: true,
    marketing: false
  })

  const plans = getAvailablePlans()
  const currentPlan = plans.find(plan => plan.tier === currentTier)

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    toast.info("Saving changes...")
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast.success("Settings saved successfully!")
  }

  const handleExportData = () => {
    toast.info("Preparing data export...")
    const data = {
      subscription: currentPlan,
      usage: "exported data",
      timestamp: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscription-data.json'
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Data exported successfully!")
  }

  const handleDownloadReport = () => {
    toast.info("Generating report...")
    const report = `Subscription Report\n\nPlan: ${currentPlan?.name}\nTier: ${currentTier}\nGenerated: ${new Date().toLocaleDateString()}`
    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscription-report.txt'
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Report downloaded successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/subscription/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Subscription Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage your subscription, billing, and preferences
                </p>
              </div>
            </div>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Tabs defaultValue="billing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="data">Data & Export</TabsTrigger>
          </TabsList>

          <TabsContent value="billing" className="space-y-6">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{currentPlan?.name || "Free Plan"}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      ${currentPlan?.price || 0}/month
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
                  </Badge>
                </div>
                <div className="mt-4">
                  <Link href="/subscription/plans">
                    <Button variant="outline">
                      Change Plan
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Expires 12/25</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Billing History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "Dec 15, 2024", amount: "$29.00", status: "paid" },
                    { date: "Nov 15, 2024", amount: "$29.00", status: "paid" },
                    { date: "Oct 15, 2024", amount: "$29.00", status: "paid" }
                  ].map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">Invoice #{index + 1}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{invoice.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">${invoice.amount}</span>
                        <Badge variant="secondary" className="text-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {invoice.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Billing Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Billing Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-renewal">Auto-renewal</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Automatically renew your subscription
                    </p>
                  </div>
                  <Switch id="auto-renewal" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-receipts">Email receipts</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Send receipts to your email
                    </p>
                  </div>
                  <Switch id="email-receipts" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Receive important updates via email
                      </p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notifications.email}
                      onCheckedChange={(value) => handleNotificationChange('email', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="usage-alerts">Usage Alerts</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Get notified when approaching usage limits
                      </p>
                    </div>
                    <Switch 
                      id="usage-alerts" 
                      checked={notifications.usage}
                      onCheckedChange={(value) => handleNotificationChange('usage', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="billing-notifications">Billing Notifications</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Receive billing and payment updates
                      </p>
                    </div>
                    <Switch 
                      id="billing-notifications" 
                      checked={notifications.billing}
                      onCheckedChange={(value) => handleNotificationChange('billing', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Receive product updates and promotional content
                      </p>
                    </div>
                    <Switch 
                      id="marketing-emails" 
                      checked={notifications.marketing}
                      onCheckedChange={(value) => handleNotificationChange('marketing', value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      placeholder="Enter current password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      placeholder="Enter new password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="Confirm new password"
                      className="mt-1"
                    />
                  </div>
                  <Button className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-sharing">Data Sharing</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Allow data sharing for product improvement
                    </p>
                  </div>
                  <Switch id="data-sharing" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">Analytics</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Help us improve by sharing usage analytics
                    </p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Data Export
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Export All Data</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Download all your subscription data, usage history, and account information.
                    </p>
                    <Button onClick={handleExportData} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Download Reports</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Generate and download detailed usage and billing reports.
                    </p>
                    <Button onClick={handleDownloadReport} variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download Reports
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20">
                  <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">
                    Delete Account
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-300 mb-3">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
