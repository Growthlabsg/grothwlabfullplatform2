"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Employee, Permission } from "@/types/founder"
import { useFounderAuth } from "@/contexts/founder-auth-context"

// Mock employee data
const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@growthlab.sg",
    role: "Product Manager",
    department: "Product",
    hireDate: "2024-01-15",
    salary: 85000,
    permissions: ["founder:read:features", "founder:manage:features"],
    accessLevel: "limited",
    isActive: true,
    lastLogin: "2024-12-19T10:30:00Z",
    performanceRating: 4.5,
    managerId: null,
    directReports: ["2", "3"],
    skills: ["Product Strategy", "User Research", "Agile"],
    projects: ["Phase 1 Launch", "User Onboarding"],
    notes: "Strong product sense, great with stakeholders"
  },
  {
    id: "2",
    firstName: "Marcus",
    lastName: "Rodriguez",
    email: "marcus.rodriguez@growthlab.sg",
    role: "Senior Developer",
    department: "Engineering",
    hireDate: "2024-02-01",
    salary: 95000,
    permissions: ["founder:read:features", "founder:deploy:features"],
    accessLevel: "technical",
    isActive: true,
    lastLogin: "2024-12-19T09:15:00Z",
    performanceRating: 4.8,
    managerId: "1",
    directReports: [],
    skills: ["React", "Node.js", "AWS", "TypeScript"],
    projects: ["Phase 1 Launch", "API Development"],
    notes: "Excellent technical skills, needs mentorship on business context"
  },
  {
    id: "3",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@growthlab.sg",
    role: "Marketing Specialist",
    department: "Marketing",
    hireDate: "2024-03-10",
    salary: 65000,
    permissions: ["founder:read:analytics", "founder:manage:content"],
    accessLevel: "limited",
    isActive: true,
    lastLogin: "2024-12-18T16:45:00Z",
    performanceRating: 4.2,
    managerId: "1",
    directReports: [],
    skills: ["Digital Marketing", "Content Creation", "Analytics"],
    projects: ["Brand Launch", "Content Strategy"],
    notes: "Creative and data-driven, learning platform specifics"
  }
]

const mockPermissions: Permission[] = [
  "founder:read:features",
  "founder:manage:features",
  "founder:deploy:features",
  "founder:read:analytics",
  "founder:manage:content",
  "founder:manage:employees",
  "founder:manage:revenue",
  "founder:manage:security",
  "founder:manage:infrastructure"
]

export default function EmployeeManagement() {
  const { toast } = useToast()
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [accessLevelFilter, setAccessLevelFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    department: "",
    salary: 0,
    permissions: [],
    accessLevel: "limited"
  })

  const departments = ["Product", "Engineering", "Marketing", "Sales", "Operations", "Finance"]
  const accessLevels = ["limited", "technical", "managerial", "executive"]

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    const matchesAccessLevel = accessLevelFilter === "all" || employee.accessLevel === accessLevelFilter

    return matchesSearch && matchesDepartment && matchesAccessLevel
  })

  const handleAddEmployee = () => {
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const employee: Employee = {
      id: Date.now().toString(),
      firstName: newEmployee.firstName!,
      lastName: newEmployee.lastName!,
      email: newEmployee.email!,
      role: newEmployee.role!,
      department: newEmployee.department!,
      hireDate: new Date().toISOString().split('T')[0],
      salary: newEmployee.salary || 0,
      permissions: newEmployee.permissions || [],
      accessLevel: newEmployee.accessLevel as any || "limited",
      isActive: true,
      lastLogin: null,
      performanceRating: 0,
      managerId: null,
      directReports: [],
      skills: [],
      projects: [],
      notes: ""
    }

    setEmployees([...employees, employee])
    setNewEmployee({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      department: "",
      salary: 0,
      permissions: [],
      accessLevel: "limited"
    })
    setIsAddDialogOpen(false)
    
    toast({
      title: "Employee Added",
      description: `${employee.firstName} ${employee.lastName} has been added to the team`,
    })
  }

  const handleUpdateEmployee = (employeeId: string, updates: Partial<Employee>) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, ...updates } : emp
    ))
    
    toast({
      title: "Employee Updated",
      description: "Employee information has been updated successfully",
    })
  }

  const handleTogglePermission = (employeeId: string, permission: Permission) => {
    const employee = employees.find(emp => emp.id === employeeId)
    if (!employee) return

    const hasPermission = employee.permissions.includes(permission)
    const newPermissions = hasPermission
      ? employee.permissions.filter(p => p !== permission)
      : [...employee.permissions, permission]

    handleUpdateEmployee(employeeId, { permissions: newPermissions })
  }

  const handleToggleActive = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId)
    if (!employee) return

    handleUpdateEmployee(employeeId, { isActive: !employee.isActive })
  }

  const getPermissionBadgeVariant = (permission: Permission) => {
    if (permission.includes("manage")) return "default"
    if (permission.includes("deploy")) return "secondary"
    if (permission.includes("read")) return "outline"
    return "secondary"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employee Management</h2>
          <p className="text-muted-foreground">
            Manage your team, assign permissions, and control access levels
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Employee</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Add a new team member with their role and initial permissions
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={newEmployee.firstName}
                  onChange={(e) => setNewEmployee({...newEmployee, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={newEmployee.lastName}
                  onChange={(e) => setNewEmployee({...newEmployee, lastName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={newEmployee.role}
                  onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee({...newEmployee, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  value={newEmployee.salary}
                  onChange={(e) => setNewEmployee({...newEmployee, salary: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessLevel">Access Level</Label>
                <Select value={newEmployee.accessLevel} onValueChange={(value) => setNewEmployee({...newEmployee, accessLevel: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accessLevels.map(level => (
                      <SelectItem key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddEmployee}>Add Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={accessLevelFilter} onValueChange={setAccessLevelFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Access Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {accessLevels.map(level => (
              <SelectItem key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Employee List */}
      <div className="grid gap-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${employee.email}`} />
                    <AvatarFallback>{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.firstName} {employee.lastName}</CardTitle>
                    <CardDescription>{employee.role} • {employee.department}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={employee.isActive ? "default" : "secondary"}>
                    {employee.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline">{employee.accessLevel}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedEmployee(employee)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{employee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hire Date</p>
                  <p className="font-medium">{new Date(employee.hireDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Salary</p>
                  <p className="font-medium">${employee.salary.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <p className="font-medium">{employee.performanceRating}/5.0</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Permissions</p>
                  <div className="flex flex-wrap gap-2">
                    {employee.permissions.map((permission) => (
                      <Badge
                        key={permission}
                        variant={getPermissionBadgeVariant(permission)}
                        className="cursor-pointer"
                        onClick={() => handleTogglePermission(employee.id, permission)}
                      >
                        {permission.replace('founder:', '')}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Status</p>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={employee.isActive}
                      onCheckedChange={() => handleToggleActive(employee.id)}
                    />
                    <span className="text-sm">{employee.isActive ? "Active" : "Inactive"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Employee: {selectedEmployee?.firstName} {selectedEmployee?.lastName}</DialogTitle>
            <DialogDescription>
              Update employee information and permissions
            </DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={selectedEmployee.role}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, role: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={selectedEmployee.department} onValueChange={(value) => setSelectedEmployee({...selectedEmployee, department: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Salary</Label>
                  <Input
                    type="number"
                    value={selectedEmployee.salary}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, salary: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Access Level</Label>
                  <Select value={selectedEmployee.accessLevel} onValueChange={(value) => setSelectedEmployee({...selectedEmployee, accessLevel: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accessLevels.map(level => (
                        <SelectItem key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Permissions</Label>
                <div className="grid grid-cols-3 gap-2">
                  {mockPermissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Switch
                        checked={selectedEmployee.permissions.includes(permission)}
                        onCheckedChange={() => handleTogglePermission(selectedEmployee.id, permission)}
                      />
                      <Label className="text-sm">{permission.replace('founder:', '')}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Notes</Label>
                <Input
                  value={selectedEmployee.notes}
                  onChange={(e) => setSelectedEmployee({...selectedEmployee, notes: e.target.value})}
                  placeholder="Add notes about this employee..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              if (selectedEmployee) {
                handleUpdateEmployee(selectedEmployee.id, selectedEmployee)
                setIsEditDialogOpen(false)
              }
            }}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
