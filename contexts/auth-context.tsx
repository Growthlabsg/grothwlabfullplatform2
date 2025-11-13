'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface UserProfile {
  id: string
  email: string
  name?: string
  firstName?: string
  lastName?: string
  picture?: string
  profilePicture?: string
  provider: 'google' | 'linkedin' | 'demo'
  accessToken?: string
  expiresAt?: number
  // Add missing properties that the sidebar expects
  role?: string
  avatarUrl?: string
  displayName?: string
  profileCompleted?: boolean
}

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  isLoading: boolean
  completeProfile: (profileData: any) => Promise<void>
  login: (provider: 'google' | 'linkedin') => void
  demoLogin: (email: string, password: string) => boolean
  signup: (email: string, password: string, role: string) => Promise<void>
  logout: () => void
  importLinkedInProfile: (profileType: string) => Promise<any>
  hasPermission: (permission: string) => boolean
  isFounder: () => boolean
  isAdmin: () => boolean
  // Add missing properties for founder dashboard
  getPlatformFeatures: () => any[]
  toggleFeature: (featureId: string) => void
  updateFeaturePhase: (featureId: string, phase: string) => void
  getEmployees: () => any[]
  updateEmployeePermissions: (employeeId: string, permissions: string[]) => void
  createEmployee: (employeeData: any) => void
  error?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session
    const checkAuth = async () => {
      try {
        // Check cookies for user session (OAuth routes set cookies)
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`
          const parts = value.split(`; ${name}=`)
          if (parts.length === 2) return parts.pop()?.split(';').shift()
          return null
        }
        
        const userProfileCookie = getCookie('user_profile')
        if (userProfileCookie) {
          try {
            const parsed = JSON.parse(decodeURIComponent(userProfileCookie))
            // Check if token is still valid
            if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
              // Add missing properties that the sidebar expects
              const userWithDefaults = {
                ...parsed,
                role: parsed.role || 'user',
                avatarUrl: parsed.avatarUrl || parsed.picture || parsed.profilePicture || '',
                displayName: parsed.displayName || parsed.name || `${parsed.firstName || ''} ${parsed.lastName || ''}`.trim() || parsed.email
              }
              setUser(userWithDefaults)
            } else {
              // Token expired, clear cookie
              document.cookie = 'user_profile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
              setUser(null)
            }
          } catch (error) {
            console.error('Error parsing user profile cookie:', error)
            // Clear invalid cookie
            document.cookie = 'user_profile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (provider: 'google' | 'linkedin') => {
    // Redirect to OAuth provider
    if (provider === 'google') {
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google')}&response_type=code&scope=openid email profile&access_type=offline`
      window.location.href = googleAuthUrl
    } else if (provider === 'linkedin') {
      const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || 'http://localhost:3000/api/auth/linkedin')}&scope=r_liteprofile r_emailaddress&state=${Math.random().toString(36).substring(7)}`
      window.location.href = linkedinAuthUrl
    }
  }

  const demoLogin = (email: string, password: string) => {
    // Check if this is the demo account
    if (email === 'john@example.com' && password === 'password') {
      const demoUser: UserProfile = {
        id: 'demo-1',
        email: 'john@example.com',
        name: 'John Doe',
        provider: 'demo',
        role: 'admin',
        avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=0F7377&color=fff',
        displayName: 'John Doe',
        expiresAt: Date.now() + (60 * 60 * 24 * 7 * 1000) // 7 days
      }
      
      // Set the user in state
      setUser(demoUser)
      
      // Store in cookie for persistence
      document.cookie = `user_profile=${encodeURIComponent(JSON.stringify(demoUser))}; path=/; max-age=${7 * 24 * 60 * 60}`
      
      return true
    }
    return false
  }

  const signup = async (email: string, password: string, role: string): Promise<void> => {
    // Mock implementation for now
    console.log(`Signing up user: ${email} with role: ${role}`)
    
    // Create a mock user profile
    const mockUser: UserProfile = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0], // Use email prefix as name
      provider: 'google', // Default provider for mock signup
      role,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=0F7377&color=fff`,
      displayName: email.split('@')[0],
      expiresAt: Date.now() + (60 * 60 * 24 * 7 * 1000) // 7 days
    }
    
    // Set the user in state
    setUser(mockUser)
    
    // In a real app, you would send this to your backend
    // await fetch('/api/auth/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password, role }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     // Handle successful signup, e.g., set user, redirect
    //   } else {
    //     throw new Error(data.message || 'Signup failed');
    //   }
    // })
    // .catch(error => {
    //   console.error('Signup error:', error);
    //   throw error;
    // });
  }

  const logout = () => {
    setUser(null)
    // Clear cookies instead of localStorage
    document.cookie = 'user_profile=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    // Clear any other auth-related storage
  }

  const importLinkedInProfile = async (profileType: string): Promise<any> => {
    // Mock implementation for now
    console.log(`Importing LinkedIn profile: ${profileType}`)
    return { success: true, message: 'Profile imported successfully' }
  }

  const hasPermission = (permission: string): boolean => {
    // For now, return true for all permissions
    // This can be enhanced later with actual permission checking
    return true
  }

  const isFounder = (): boolean => {
    // Check if user has founder role
    return user?.role === 'founder' || user?.role === 'admin'
  }

  const isAdmin = (): boolean => {
    // Check if user has admin role
    return user?.role === 'admin' || user?.role === 'founder'
  }

  const completeProfile = async (profileData: any): Promise<void> => {
    // Mock implementation - in real app, this would update the user profile
    console.log('Completing profile with data:', profileData)
    // For now, just update the user state
    if (user) {
      setUser({ ...user, ...profileData })
    }
  }

  // Add missing methods for founder dashboard
  const getPlatformFeatures = (): any[] => {
    // Mock implementation
    return []
  }

  const toggleFeature = (featureId: string): void => {
    // Mock implementation
    console.log('Toggling feature:', featureId)
  }

  const updateFeaturePhase = (featureId: string, phase: string): void => {
    // Mock implementation
    console.log('Updating feature phase:', featureId, phase)
  }

  const getEmployees = (): any[] => {
    // Mock implementation
    return []
  }

  const updateEmployeePermissions = (employeeId: string, permissions: string[]): void => {
    // Mock implementation
    console.log('Updating employee permissions:', employeeId, permissions)
  }

  const createEmployee = (employeeData: any): void => {
    // Mock implementation
    console.log('Creating employee:', employeeData)
  }

  const value: AuthContextType = {
    user,
    loading,
    isLoading: loading,
    completeProfile,
    login,
    signup,
    logout,
    importLinkedInProfile,
    hasPermission,
    demoLogin,
    isFounder,
    isAdmin,
    getPlatformFeatures,
    toggleFeature,
    updateFeaturePhase,
    getEmployees,
    updateEmployeePermissions,
    createEmployee,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}