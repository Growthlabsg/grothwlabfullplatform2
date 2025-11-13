"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Shield,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  Crown,
  User,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Ban,
  Unlock,
  Key,
  Download,
  Upload,
  RefreshCw
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: "super_admin" | "admin" | "moderator" | "user" | "startup" | "investor" | "mentor"
  status: "active" | "inactive" | "suspended" | "pending"
  avatar: string
  company?: string
  location?: string
  joinedDate: string
  lastActive: string
  permissions: string[]
  verified: boolean
  twoFactorEnabled: boolean
  loginAttempts: number
  ipAddress: string
  userAgent: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@growthlab.sg",
    role: "admin",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    company: "GrowthLab",
    location: "Singapore",
    joinedDate: "2024-01-15",
    lastActive: "2024-01-20T10:30:00Z",
    permissions: ["user.manage", "content.moderate", "analytics.view"],
    verified: true,
    twoFactorEnabled: true,
    loginAttempts: 0,
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@startup.com",
    role: "startup",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40&text=SC",
    company: "TechStartup Inc",
    location: "Singapore",
    joinedDate: "2024-01-10",
    lastActive: "2024-01-20T09:15:00Z",
    permissions: ["startup.manage", "funding.apply"],
    verified: true,
    twoFactorEnabled: false,
    loginAttempts: 2,
    ipAddress: "203.0.113.45",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)"
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    email: "michael@investor.com",
    role: "investor",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40&text=MR",
    company: "Venture Capital Partners",
    location: "Singapore",
    joinedDate: "2024-01-05",
    lastActive: "2024-01-20T08:45:00Z",
    permissions: ["investor.manage", "startup.view", "deal.manage"],
    verified: true,
    twoFactorEnabled: true,
    loginAttempts: 0,
    ipAddress: "198.51.100.123",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
  },
  {
    id: "4",
    name: "Emily Watson",
    email: "emily.watson@mentor.com",
    role: "mentor",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40&text=EW",
    company: "Mentorship Network",
    location: "Singapore",
    joinedDate: "2024-01-12",
    lastActive: "2024-01-19T16:20:00Z",
    permissions: ["mentor.manage", "session.schedule"],
    verified: true,
    twoFactorEnabled: false,
    loginAttempts: 1,
    ipAddress: "203.0.113.67",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@user.com",
    role: "user",
    status: "suspended",
    avatar: "/placeholder.svg?height=40&width=40&text=DK",
    company: "Freelancer",
    location: "Singapore",
    joinedDate: "2024-01-08",
    lastActive: "2024-01-18T14:30:00Z",
    permissions: ["user.basic"],
    verified: false,
    twoFactorEnabled: false,
    loginAttempts: 5,
    ipAddress: "192.168.1.200",
    userAgent: "Mozilla/5.0 (Linux; Android 13)"
  }
]

const roleColors = {
  super_admin: "bg-red-100 text-red-800",
  admin: "bg-purple-100 text-purple-800",
  moderator: "bg-blue-100 text-blue-800",
  user: "bg-gray-100 text-gray-800",
  startup: "bg-green-100 text-green-800",
  investor: "bg-yellow-100 text-yellow-800",
  mentor: "bg-indigo-100 text-indigo-800"
}

const statusColors = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  suspended: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800"
}

export function UserManagement() {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleStatusChange = (userId: string, newStatus: User["status"]) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ))
    toast({
      title: "User Status Updated",
      description: `User status changed to ${newStatus}`,
    })
  }

  const handleRoleChange = (userId: string, newRole: User["role"]) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
    toast({
      title: "User Role Updated",
      description: `User role changed to ${newRole}`,
    })
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
    toast({
      title: "User Deleted",
      description: "User has been permanently deleted",
      variant: "destructive",
    })
  }

  const handleSuspendUser = (userId: string) => {
    handleStatusChange(userId, "suspended")
  }

  const handleActivateUser = (userId: string) => {
    handleStatusChange(userId, "active")
  }

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    suspended: users.filter(u => u.status === "suspended").length,
    pending: users.filter(u => u.status === "pending").length,
    verified: users.filter(u => u.verified).length,
    twoFactorEnabled: users.filter(u => u.twoFactorEnabled).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">
            Manage all users, roles, permissions, and account status
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Users
          </Button>
          <Button onClick={() => setShowAddUserDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userStats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{userStats.suspended}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{userStats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{userStats.verified}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2FA Enabled</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{userStats.twoFactorEnabled}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Security</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role]}>
                      {user.role.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[user.status]}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {user.company || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(user.joinedDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(user.lastActive).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {user.verified && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {user.twoFactorEnabled && (
                        <Badge variant="outline" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          2FA
                        </Badge>
                      )}
                      {user.loginAttempts > 3 && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {user.loginAttempts} attempts
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => {
                          setSelectedUser(user)
                          setShowUserDialog(true)
                        }}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateUser(user.id)}>
                            <Unlock className="mr-2 h-4 w-4" />
                            Activate User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="permissions">Permissions</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Name</Label>
                      <Input value={selectedUser.name} readOnly />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={selectedUser.email} readOnly />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input value={selectedUser.company || "N/A"} readOnly />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input value={selectedUser.location || "N/A"} readOnly />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Select value={selectedUser.role} onValueChange={(value) => handleRoleChange(selectedUser.id, value as User["role"])}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="super_admin">Super Admin</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="investor">Investor</SelectItem>
                          <SelectItem value="mentor">Mentor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select value={selectedUser.status} onValueChange={(value) => handleStatusChange(selectedUser.id, value as User["status"])}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch checked={selectedUser.verified} />
                      <Label>Email Verified</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={selectedUser.twoFactorEnabled} />
                      <Label>Two-Factor Authentication</Label>
                    </div>
                    <div>
                      <Label>Login Attempts</Label>
                      <Input value={selectedUser.loginAttempts.toString()} readOnly />
                    </div>
                    <div>
                      <Label>IP Address</Label>
                      <Input value={selectedUser.ipAddress} readOnly />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <div className="space-y-2">
                    <div>
                      <Label>Joined Date</Label>
                      <Input value={new Date(selectedUser.joinedDate).toLocaleDateString()} readOnly />
                    </div>
                    <div>
                      <Label>Last Active</Label>
                      <Input value={new Date(selectedUser.lastActive).toLocaleString()} readOnly />
                    </div>
                    <div>
                      <Label>User Agent</Label>
                      <Textarea value={selectedUser.userAgent} readOnly rows={2} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="permissions" className="space-y-4">
                  <div>
                    <Label>Current Permissions</Label>
                    <div className="mt-2 space-y-2">
                      {selectedUser.permissions.map((permission) => (
                        <Badge key={permission} variant="outline">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>
              Close
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with specified role and permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                  <SelectItem value="mentor">Mentor</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="company">Company (Optional)</Label>
              <Input id="company" placeholder="Enter company name" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({
                title: "User Created",
                description: "New user account has been created successfully",
              })
              setShowAddUserDialog(false)
            }}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 