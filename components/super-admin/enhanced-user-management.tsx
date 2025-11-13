"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Plus, 
  Edit3, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Lock, 
  Unlock,
  UserCheck,
  UserX,
  Crown,
  Star,
  Eye,
  MessageSquare,
  MoreHorizontal,
  ChevronDown,
  RefreshCw,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  TrendingUp,
  Clock,
  Target,
  DollarSign
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "user" | "startup" | "investor" | "mentor" | "admin" | "super_admin"
  status: "active" | "inactive" | "suspended" | "pending"
  subscription: "free" | "premium" | "enterprise"
  joinDate: string
  lastActive: string
  location: string
  phone?: string
  verified: boolean
  totalConnections: number
  totalPosts: number
  totalEngagement: number
  revenue: number
  riskScore: number
}

export function EnhancedUserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSubscription, setFilterSubscription] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [isLoading, setIsLoading] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)

  // Sample user data
  useEffect(() => {
    const sampleUsers: User[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "/john-doe.jpg",
        role: "startup",
        status: "active",
        subscription: "premium",
        joinDate: "2023-01-15",
        lastActive: "2024-01-20 14:30",
        location: "Singapore",
        phone: "+65 9123 4567",
        verified: true,
        totalConnections: 156,
        totalPosts: 23,
        totalEngagement: 892,
        revenue: 299,
        riskScore: 15
      },
      {
        id: "2",
        name: "Sarah Chen",
        email: "sarah.chen@venture.com",
        avatar: "/sarah-chen.png",
        role: "investor",
        status: "active",
        subscription: "enterprise",
        joinDate: "2023-02-20",
        lastActive: "2024-01-20 16:45",
        location: "Singapore",
        phone: "+65 8765 4321",
        verified: true,
        totalConnections: 342,
        totalPosts: 45,
        totalEngagement: 1543,
        revenue: 999,
        riskScore: 8
      },
      {
        id: "3",
        name: "Mike Johnson",
        email: "mike.j@startup.co",
        avatar: "/placeholder-user.jpg",
        role: "user",
        status: "pending",
        subscription: "free",
        joinDate: "2024-01-18",
        lastActive: "2024-01-19 09:15",
        location: "Malaysia",
        verified: false,
        totalConnections: 12,
        totalPosts: 3,
        totalEngagement: 45,
        revenue: 0,
        riskScore: 35
      },
      {
        id: "4",
        name: "Dr. Lisa Wang",
        email: "lisa.wang@mentor.org",
        avatar: "/michelle-chen.png",
        role: "mentor",
        status: "active",
        subscription: "premium",
        joinDate: "2022-11-10",
        lastActive: "2024-01-20 11:20",
        location: "Singapore",
        phone: "+65 9876 5432",
        verified: true,
        totalConnections: 234,
        totalPosts: 67,
        totalEngagement: 2134,
        revenue: 299,
        riskScore: 5
      },
      {
        id: "5",
        name: "Alex Thompson",
        email: "alex.t@suspended.com",
        avatar: "/placeholder-user.jpg",
        role: "user",
        status: "suspended",
        subscription: "free",
        joinDate: "2023-08-05",
        lastActive: "2024-01-15 22:30",
        location: "Thailand",
        verified: false,
        totalConnections: 89,
        totalPosts: 12,
        totalEngagement: 234,
        revenue: 0,
        riskScore: 85
      }
    ]
    setUsers(sampleUsers)
  }, [])

  // Filter and sort users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    const matchesSubscription = filterSubscription === "all" || user.subscription === filterSubscription
    
    return matchesSearch && matchesRole && matchesStatus && matchesSubscription
  }).sort((a, b) => {
    const aValue = a[sortBy as keyof User]
    const bValue = b[sortBy as keyof User]
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const totalPages = Math.ceil(filteredUsers.length / pageSize)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id))
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      if (action === "activate") {
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: "active" as const } : user
        ))
      } else if (action === "suspend") {
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: "suspended" as const } : user
        ))
      } else if (action === "delete") {
        setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)))
      } else if (action === "export") {
        // Simulate export
        const exportData = users.filter(user => selectedUsers.includes(user.id))
        console.log('Exporting users:', exportData)
        alert(`Exported ${selectedUsers.length} users successfully!`)
      }
      
      setSelectedUsers([])
      setIsLoading(false)
      
      if (action !== "export") {
        alert(`${action.charAt(0).toUpperCase() + action.slice(1)} action completed for ${selectedUsers.length} users!`)
      }
    }, 1000)
  }

  const handleUserAction = (userId: string, action: string) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      if (action === "activate") {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, status: "active" as const } : user
        ))
        alert("User activated successfully!")
      } else if (action === "suspend") {
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, status: "suspended" as const } : user
        ))
        alert("User suspended successfully!")
      } else if (action === "view") {
        const user = users.find(u => u.id === userId)
        if (user) {
          alert(`Viewing user: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nStatus: ${user.status}`)
        }
      } else if (action === "edit") {
        alert(`Edit functionality for user ${userId} - This would open an edit dialog in a real application.`)
      } else if (action === "message") {
        alert(`Message functionality for user ${userId} - This would open a messaging interface in a real application.`)
      }
      
      setIsLoading(false)
    }, 500)
  }

  const getRoleColor = (role: string) => {
    const colors = {
      user: "bg-gray-100 text-gray-800",
      startup: "bg-blue-100 text-blue-800",
      investor: "bg-green-100 text-green-800",
      mentor: "bg-purple-100 text-purple-800",
      admin: "bg-orange-100 text-orange-800",
      super_admin: "bg-red-100 text-red-800"
    }
    return colors[role as keyof typeof colors] || colors.user
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800"
    }
    return colors[status as keyof typeof colors] || colors.active
  }

  const getSubscriptionColor = (subscription: string) => {
    const colors = {
      free: "bg-gray-100 text-gray-800",
      premium: "bg-blue-100 text-blue-800",
      enterprise: "bg-purple-100 text-purple-800"
    }
    return colors[subscription as keyof typeof colors] || colors.free
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enhanced User Management</h2>
          <p className="text-muted-foreground">
            Comprehensive user administration with advanced filtering and bulk operations
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => {}}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{users.length}</div>
                <div className="text-xs text-muted-foreground">Total Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === "active").length}
                </div>
                <div className="text-xs text-muted-foreground">Active Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {users.filter(u => u.subscription === "premium" || u.subscription === "enterprise").length}
                </div>
                <div className="text-xs text-muted-foreground">Premium Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {users.filter(u => u.verified).length}
                </div>
                <div className="text-xs text-muted-foreground">Verified Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.riskScore > 50).length}
                </div>
                <div className="text-xs text-muted-foreground">High Risk</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterSubscription} onValueChange={setFilterSubscription}>
              <SelectTrigger>
                <SelectValue placeholder="Subscription" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={() => {
              setSearchTerm("")
              setFilterRole("all")
              setFilterStatus("all")
              setFilterSubscription("all")
            }}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium">{selectedUsers.length} users selected</span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleBulkAction("activate")}
                    disabled={isLoading}
                  >
                    <UserCheck className="h-4 w-4 mr-1" />
                    Activate
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleBulkAction("suspend")}
                    disabled={isLoading}
                  >
                    <UserX className="h-4 w-4 mr-1" />
                    Suspend
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleBulkAction("delete")}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleBulkAction("export")}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedUsers([])}>
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="joinDate">Join Date</SelectItem>
                  <SelectItem value="lastActive">Last Active</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="riskScore">Risk Score</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="flex items-center p-3 bg-gray-50 rounded-lg font-medium text-sm">
              <div className="w-8">
                <Checkbox 
                  checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </div>
              <div className="flex-1 grid grid-cols-8 gap-4">
                <div className="col-span-2">User</div>
                <div>Role</div>
                <div>Status</div>
                <div>Subscription</div>
                <div>Engagement</div>
                <div>Revenue</div>
                <div>Actions</div>
              </div>
            </div>

            {/* Table Rows */}
            {paginatedUsers.map((user) => (
              <div key={user.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8">
                  <Checkbox 
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleSelectUser(user.id)}
                  />
                </div>
                <div className="flex-1 grid grid-cols-8 gap-4 items-center">
                  {/* User Info */}
                  <div className="col-span-2 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {user.name}
                        {user.verified && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {user.location}
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.replace('_', ' ')}
                    </Badge>
                  </div>

                  {/* Status */}
                  <div>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                    {user.riskScore > 50 && (
                      <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        High Risk
                      </div>
                    )}
                  </div>

                  {/* Subscription */}
                  <div>
                    <Badge className={getSubscriptionColor(user.subscription)}>
                      {user.subscription}
                    </Badge>
                  </div>

                  {/* Engagement */}
                  <div className="text-sm">
                    <div className="flex items-center gap-1 mb-1">
                      <Users className="h-3 w-3" />
                      {user.totalConnections}
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {user.totalEngagement}
                    </div>
                  </div>

                  {/* Revenue */}
                  <div className="text-sm">
                    <div className="font-medium text-green-600">
                      ${user.revenue}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user.subscription === "free" ? "Free Plan" : "Paid Plan"}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleUserAction(user.id, "view")}
                      disabled={isLoading}
                      title="View User Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleUserAction(user.id, "edit")}
                      disabled={isLoading}
                      title="Edit User"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleUserAction(user.id, "message")}
                      disabled={isLoading}
                      title="Send Message"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    {user.status === "active" ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleUserAction(user.id, "suspend")}
                        disabled={isLoading}
                        title="Suspend User"
                      >
                        <Lock className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleUserAction(user.id, "activate")}
                        disabled={isLoading}
                        title="Activate User"
                      >
                        <Unlock className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
              </span>
              <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                First
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                Last
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
