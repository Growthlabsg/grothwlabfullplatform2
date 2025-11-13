"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock,
  Mail,
  Phone,
  Calendar,
  Settings,
  Key,
  Eye,
  EyeOff
} from "lucide-react"

interface Employee {
  id: string
  name: string
  email: string
  role: 'admin' | 'reviewer' | 'senior_reviewer' | 'manager'
  permissions: string[]
  status: 'active' | 'inactive' | 'suspended'
  lastActive: string
  reviewCount: number
  approvalRate: number
  assignedProjects: string[]
  avatar: string
  phone?: string
  department?: string
  joinDate: string
  accessLevel: 'full' | 'limited' | 'readonly'
}

interface Permission {
  id: string
  name: string
  description: string
  category: string
  required: boolean
}

export function EmployeeAccessControl() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "emp_001",
      name: "John Doe",
      email: "john.doe@growthlab.com",
      role: "senior_reviewer",
      permissions: ["review_projects", "approve_projects", "assign_reviewers", "manage_employees"],
      status: "active",
      lastActive: "2024-01-15T10:30:00Z",
      reviewCount: 45,
      approvalRate: 78,
      assignedProjects: ["proj_002"],
      avatar: "/avatars/john.jpg",
      phone: "+1-555-0123",
      department: "Project Review",
      joinDate: "2023-06-15",
      accessLevel: "full"
    },
    {
      id: "emp_002",
      name: "Jane Smith",
      email: "jane.smith@growthlab.com",
      role: "reviewer",
      permissions: ["review_projects"],
      status: "active",
      lastActive: "2024-01-15T09:15:00Z",
      reviewCount: 23,
      approvalRate: 82,
      assignedProjects: [],
      avatar: "/avatars/jane.jpg",
      phone: "+1-555-0124",
      department: "Project Review",
      joinDate: "2023-08-20",
      accessLevel: "limited"
    },
    {
      id: "emp_003",
      name: "Mike Johnson",
      email: "mike.johnson@growthlab.com",
      role: "manager",
      permissions: ["review_projects", "approve_projects", "assign_reviewers", "view_analytics"],
      status: "active",
      lastActive: "2024-01-14T16:45:00Z",
      reviewCount: 67,
      approvalRate: 85,
      assignedProjects: ["proj_001"],
      avatar: "/avatars/mike.jpg",
      phone: "+1-555-0125",
      department: "Operations",
      joinDate: "2023-03-10",
      accessLevel: "full"
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const permissions: Permission[] = [
    { id: "review_projects", name: "Review Projects", description: "Can review submitted projects", category: "Projects", required: true },
    { id: "approve_projects", name: "Approve Projects", description: "Can approve or reject projects", category: "Projects", required: false },
    { id: "assign_reviewers", name: "Assign Reviewers", description: "Can assign projects to reviewers", category: "Projects", required: false },
    { id: "manage_employees", name: "Manage Employees", description: "Can add/edit/remove employees", category: "Administration", required: false },
    { id: "view_analytics", name: "View Analytics", description: "Can access analytics dashboard", category: "Analytics", required: false },
    { id: "manage_settings", name: "Manage Settings", description: "Can modify system settings", category: "Administration", required: false },
    { id: "view_logs", name: "View Logs", description: "Can access activity logs", category: "Monitoring", required: false },
    { id: "manage_users", name: "Manage Users", description: "Can manage platform users", category: "Users", required: false }
  ]

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "reviewer" as const,
    permissions: [] as string[],
    phone: "",
    department: "",
    accessLevel: "limited" as const
  })

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === "all" || employee.role === roleFilter
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'manager': return 'bg-purple-100 text-purple-800'
      case 'senior_reviewer': return 'bg-blue-100 text-blue-800'
      case 'reviewer': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'full': return 'bg-blue-100 text-blue-800'
      case 'limited': return 'bg-yellow-100 text-yellow-800'
      case 'readonly': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddEmployee = () => {
    const employee: Employee = {
      id: `emp_${Date.now()}`,
      ...newEmployee,
      status: 'active',
      lastActive: new Date().toISOString(),
      reviewCount: 0,
      approvalRate: 0,
      assignedProjects: [],
      avatar: "/avatars/default.jpg",
      joinDate: new Date().toISOString().split('T')[0]
    }
    setEmployees(prev => [...prev, employee])
    setNewEmployee({
      name: "",
      email: "",
      role: "reviewer",
      permissions: [],
      phone: "",
      department: "",
      accessLevel: "limited"
    })
    setShowAddModal(false)
  }

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowEditModal(true)
  }

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ))
    setShowEditModal(false)
    setSelectedEmployee(null)
  }

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== employeeId))
  }

  const handleTogglePermission = (employeeId: string, permissionId: string) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === employeeId) {
        const hasPermission = emp.permissions.includes(permissionId)
        return {
          ...emp,
          permissions: hasPermission 
            ? emp.permissions.filter(p => p !== permissionId)
            : [...emp.permissions, permissionId]
        }
      }
      return emp
    }))
  }

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Access Control</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage employee permissions and access levels</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-blue-600">{employees.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {employees.filter(e => e.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reviewers</p>
                <p className="text-2xl font-bold text-purple-600">
                  {employees.filter(e => e.role === 'reviewer' || e.role === 'senior_reviewer').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Managers</p>
                <p className="text-2xl font-bold text-orange-600">
                  {employees.filter(e => e.role === 'manager' || e.role === 'admin').length}
                </p>
              </div>
              <Settings className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="senior_reviewer">Senior Reviewer</SelectItem>
                <SelectItem value="reviewer">Reviewer</SelectItem>
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
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employees List */}
      <div className="space-y-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar} />
                    <AvatarFallback>{employee.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {employee.name}
                      </h3>
                      <Badge className={getRoleColor(employee.role)}>
                        {employee.role.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status.toUpperCase()}
                      </Badge>
                      <Badge className={getAccessLevelColor(employee.accessLevel)}>
                        {employee.accessLevel.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{employee.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Department</p>
                        <p className="font-medium">{employee.department || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reviews</p>
                        <p className="font-medium">{employee.reviewCount} ({employee.approvalRate}% approval)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Active</p>
                        <p className="font-medium">{new Date(employee.lastActive).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Permissions</p>
                      <div className="flex flex-wrap gap-1">
                        {employee.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEditEmployee(employee)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Employee Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Name
                </label>
                <Input
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  placeholder="Employee name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  placeholder="employee@growthlab.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Role
                </label>
                <Select value={newEmployee.role} onValueChange={(value: any) => setNewEmployee({...newEmployee, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reviewer">Reviewer</SelectItem>
                    <SelectItem value="senior_reviewer">Senior Reviewer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Access Level
                </label>
                <Select value={newEmployee.accessLevel} onValueChange={(value: any) => setNewEmployee({...newEmployee, accessLevel: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="readonly">Read Only</SelectItem>
                    <SelectItem value="limited">Limited</SelectItem>
                    <SelectItem value="full">Full Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Phone
                </label>
                <Input
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                  placeholder="+1-555-0123"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Department
                </label>
                <Input
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                  placeholder="Department"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Permissions
              </label>
              <div className="space-y-3">
                {Object.entries(groupedPermissions).map(([category, perms]) => (
                  <div key={category}>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">{category}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {perms.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={newEmployee.permissions.includes(permission.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewEmployee({
                                  ...newEmployee,
                                  permissions: [...newEmployee.permissions, permission.id]
                                })
                              } else {
                                setNewEmployee({
                                  ...newEmployee,
                                  permissions: newEmployee.permissions.filter(p => p !== permission.id)
                                })
                              }
                            }}
                          />
                          <label htmlFor={permission.id} className="text-sm">
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddEmployee} className="flex-1">
                Add Employee
              </Button>
              <Button onClick={() => setShowAddModal(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Employee: {selectedEmployee?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Name
                  </label>
                  <Input
                    value={selectedEmployee.name}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={selectedEmployee.email}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Role
                  </label>
                  <Select 
                    value={selectedEmployee.role} 
                    onValueChange={(value: any) => setSelectedEmployee({...selectedEmployee, role: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reviewer">Reviewer</SelectItem>
                      <SelectItem value="senior_reviewer">Senior Reviewer</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Status
                  </label>
                  <Select 
                    value={selectedEmployee.status} 
                    onValueChange={(value: any) => setSelectedEmployee({...selectedEmployee, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Permissions
                </label>
                <div className="space-y-3">
                  {Object.entries(groupedPermissions).map(([category, perms]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">{category}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {perms.map((permission) => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`edit-${permission.id}`}
                              checked={selectedEmployee.permissions.includes(permission.id)}
                              onCheckedChange={(checked) => {
                                handleTogglePermission(selectedEmployee.id, permission.id)
                              }}
                            />
                            <label htmlFor={`edit-${permission.id}`} className="text-sm">
                              {permission.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleUpdateEmployee(selectedEmployee)} className="flex-1">
                  Update Employee
                </Button>
                <Button onClick={() => setShowEditModal(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
