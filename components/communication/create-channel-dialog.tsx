"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Hash, 
  Lock, 
  Users, 
  Plus, 
  X, 
  Search,
  UserPlus,
  Settings
} from "lucide-react"

interface CreateChannelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateChannel: (channelData: ChannelData) => void
}

interface ChannelData {
  name: string
  description: string
  type: "public" | "private"
  category: string
  members: string[]
  allowInvites: boolean
  allowFileSharing: boolean
  allowVoiceMessages: boolean
  allowReactions: boolean
  moderation: "open" | "moderated" | "restricted"
}

export function CreateChannelDialog({ open, onOpenChange, onCreateChannel }: CreateChannelDialogProps) {
  const [channelData, setChannelData] = useState<ChannelData>({
    name: "",
    description: "",
    type: "public",
    category: "general",
    members: [],
    allowInvites: true,
    allowFileSharing: true,
    allowVoiceMessages: true,
    allowReactions: true,
    moderation: "open"
  })
  
  const [searchQuery, setSearchQuery] = useState("")
  const [step, setStep] = useState(1)
  
  // Mock users for member selection
  const availableUsers = [
    { id: "1", name: "John Doe", email: "john@example.com", avatar: "", role: "Developer" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", avatar: "", role: "Designer" },
    { id: "3", name: "Mike Johnson", email: "mike@example.com", avatar: "", role: "Manager" },
    { id: "4", name: "Sarah Wilson", email: "sarah@example.com", avatar: "", role: "Developer" },
    { id: "5", name: "Tom Brown", email: "tom@example.com", avatar: "", role: "Designer" }
  ]
  
  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const handleCreateChannel = () => {
    if (!channelData.name.trim()) return
    
    onCreateChannel(channelData)
    setChannelData({
      name: "",
      description: "",
      type: "public",
      category: "general",
      members: [],
      allowInvites: true,
      allowFileSharing: true,
      allowVoiceMessages: true,
      allowReactions: true,
      moderation: "open"
    })
    setStep(1)
    onOpenChange(false)
  }
  
  const toggleMember = (userId: string) => {
    setChannelData(prev => ({
      ...prev,
      members: prev.members.includes(userId)
        ? prev.members.filter(id => id !== userId)
        : [...prev.members, userId]
    }))
  }
  
  const getChannelIcon = () => {
    return channelData.type === "private" ? <Lock className="h-4 w-4" /> : <Hash className="h-4 w-4" />
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#0F7377] flex items-center justify-center">
              {getChannelIcon()}
            </div>
            <span>Create New Channel</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="channel-name">Channel Name *</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {getChannelIcon()}
                    </div>
                    <Input
                      id="channel-name"
                      placeholder="e.g., general, announcements"
                      value={channelData.name}
                      onChange={(e) => setChannelData(prev => ({ ...prev, name: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="channel-type">Channel Type</Label>
                  <Select
                    value={channelData.type}
                    onValueChange={(value: "public" | "private") => 
                      setChannelData(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center space-x-2">
                          <Hash className="h-4 w-4" />
                          <span>Public</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center space-x-2">
                          <Lock className="h-4 w-4" />
                          <span>Private</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="channel-description">Description</Label>
                <Textarea
                  id="channel-description"
                  placeholder="What is this channel about?"
                  value={channelData.description}
                  onChange={(e) => setChannelData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="channel-category">Category</Label>
                  <Select
                    value={channelData.category}
                    onValueChange={(value) => 
                      setChannelData(prev => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="moderation">Moderation</Label>
                  <Select
                    value={channelData.moderation}
                    onValueChange={(value: "open" | "moderated" | "restricted") => 
                      setChannelData(prev => ({ ...prev, moderation: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="moderated">Moderated</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Members */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Add Members</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleMember(user.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-[#0F7377] text-white text-xs">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Checkbox
                        checked={channelData.members.includes(user.id)}
                        onChange={() => toggleMember(user.id)}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {channelData.members.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Members ({channelData.members.length})</Label>
                  <div className="flex flex-wrap gap-2">
                    {channelData.members.map((memberId) => {
                      const user = availableUsers.find(u => u.id === memberId)
                      return user ? (
                        <Badge key={memberId} variant="secondary" className="flex items-center space-x-1">
                          <span>{user.name}</span>
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => toggleMember(memberId)}
                          />
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Step 3: Settings */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Channel Permissions</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Allow Invites</Label>
                      <p className="text-sm text-gray-500">Members can invite others to this channel</p>
                    </div>
                    <Switch
                      checked={channelData.allowInvites}
                      onCheckedChange={(checked) => 
                        setChannelData(prev => ({ ...prev, allowInvites: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>File Sharing</Label>
                      <p className="text-sm text-gray-500">Allow members to share files</p>
                    </div>
                    <Switch
                      checked={channelData.allowFileSharing}
                      onCheckedChange={(checked) => 
                        setChannelData(prev => ({ ...prev, allowFileSharing: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Voice Messages</Label>
                      <p className="text-sm text-gray-500">Allow voice message recording</p>
                    </div>
                    <Switch
                      checked={channelData.allowVoiceMessages}
                      onCheckedChange={(checked) => 
                        setChannelData(prev => ({ ...prev, allowVoiceMessages: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Reactions</Label>
                      <p className="text-sm text-gray-500">Allow message reactions</p>
                    </div>
                    <Switch
                      checked={channelData.allowReactions}
                      onCheckedChange={(checked) => 
                        setChannelData(prev => ({ ...prev, allowReactions: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)}>
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleCreateChannel}
                disabled={!channelData.name.trim()}
                className="bg-[#0F7377] hover:bg-[#0F7377]/90"
              >
                Create Channel
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
