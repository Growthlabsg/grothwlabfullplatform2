"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Linkedin, ExternalLink, RefreshCw, CheckCircle } from "lucide-react"

export function LinkedInIntegration() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileUrl, setProfileUrl] = useState("")

  const handleConnect = async () => {
    setIsLoading(true)
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsConnected(true)
    setIsLoading(false)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setProfileUrl("")
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate refresh process
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Linkedin className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <CardTitle>LinkedIn Integration</CardTitle>
            <CardDescription>
              Connect your LinkedIn profile to enhance your networking experience
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isConnected ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-url">LinkedIn Profile URL</Label>
              <Input
                id="profile-url"
                placeholder="https://linkedin.com/in/your-profile"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Import professional experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Sync connections and network</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Auto-update profile information</span>
              </div>
            </div>

            <Button 
              onClick={handleConnect} 
              disabled={!profileUrl || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Linkedin className="h-4 w-4 mr-2" />
                  Connect LinkedIn Profile
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">LinkedIn Connected</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Active
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Profile URL</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{profileUrl}</span>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Auto-sync enabled</span>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last synced</span>
                <span className="text-sm text-gray-900">2 hours ago</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Now
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDisconnect}
                className="flex-1"
              >
                Disconnect
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
