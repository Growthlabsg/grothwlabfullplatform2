import type { UserRole, Permission } from "@/types/auth"

// Define role-based permissions
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    "view:users",
    "edit:users",
    "delete:users",
    "view:startups",
    "edit:startups",
    "delete:startups",
    "view:investors",
    "edit:investors",
    "delete:investors",
    "view:mentors",
    "edit:mentors",
    "delete:mentors",
    "view:events",
    "create:events",
    "edit:events",
    "delete:events",
    "view:courses",
    "create:courses",
    "edit:courses",
    "delete:courses",
    "view:funding",
    "create:funding",
    "edit:funding",
    "delete:funding",
    "view:applications",
    "review:applications",
    "approve:applications",
    "reject:applications",
    "view:analytics",
    "export:data",
    "import:data",
    "manage:system",
  ],
  startup: [
    "view:investors",
    "view:mentors",
    "view:events",
    "view:courses",
    "view:funding",
    "review:applications",
    "view:applications",
    "view:startups", // Added view:startups here
  ],
  investor: [
    "view:startups",
    "view:events",
    "view:funding",
    "create:funding",
    "edit:funding",
    "view:applications",
    "review:applications",
  ],
  mentor: ["view:startups", "view:events", "view:courses"],
  teacher: ["view:courses", "create:courses", "edit:courses", "view:startups", "view:events"],
  accelerator: [
    "view:startups",
    "view:investors",
    "view:mentors",
    "view:events",
    "create:events",
    "edit:events",
    "view:applications",
    "review:applications",
  ],
  corporate: ["view:startups", "view:events", "view:funding", "create:funding", "edit:funding"],
  government: ["view:startups", "view:investors", "view:events", "view:funding", "view:analytics"],
}

// Check if a user has a specific permission
export function hasPermission(roles: UserRole[], permission: Permission): boolean {
  for (const role of roles) {
    if (rolePermissions[role]?.includes(permission)) {
      return true
    }
  }
  return false
}

// Check if a user has any of the specified roles
export function hasRole(userRoles: UserRole[], requiredRoles: UserRole[]): boolean {
  return userRoles.some((role) => requiredRoles.includes(role))
}

// Get all permissions for a set of roles
export function getUserPermissions(roles: UserRole[]): Permission[] {
  const permissions = new Set<Permission>()

  for (const role of roles) {
    if (rolePermissions[role]) {
      (rolePermissions[role] ? rolePermissions[role].forEach : undefined)((permission) => permissions.add(permission))
    }
  }

  return Array.from(permissions)
}
