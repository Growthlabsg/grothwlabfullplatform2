'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Linkedin, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Briefcase, 
  GraduationCap, 
  Star,
  Loader2
} from 'lucide-react'

interface ImportProgress {
  basic: boolean
  experience: boolean
  education: boolean
  skills: boolean
}

export default function LinkedInImport() {
  const { user, importLinkedInProfile } = useAuth()
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState<ImportProgress>({
    basic: false,
    experience: false,
    education: false,
    skills: false
  })
  const [importedData, setImportedData] = useState<any>(null)
  const [error, setError] = useState('')

  const handleImport = async (profileType: string) => {
    if (!user?.accessToken) {
      setError('No LinkedIn access token available. Please login with LinkedIn first.')
      return
    }

    setIsImporting(true)
    setError('')

    try {
      const result = await importLinkedInProfile(profileType)
      
      if (result.success) {
        setImportedData(result.data)
        
        // Update progress
        if (profileType === 'basic') {
          setImportProgress(prev => ({ ...prev, basic: true }))
        } else if (profileType === 'experience') {
          setImportProgress(prev => ({ ...prev, experience: true }))
        } else if (profileType === 'education') {
          setImportProgress(prev => ({ ...prev, education: true }))
        } else if (profileType === 'skills') {
          setImportProgress(prev => ({ ...prev, skills: true }))
        }
      }
    } catch (err) {
      setError(`Failed to import ${profileType} profile: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsImporting(false)
    }
  }

  const handleImportAll = async () => {
    if (!user?.accessToken) {
      setError('No LinkedIn access token available. Please login with LinkedIn first.')
      return
    }

    setIsImporting(true)
    setError('')

    try {
      // Import all profile sections sequentially
      const types = ['basic', 'experience', 'education', 'skills']
      
      for (const type of types) {
        const result = await importLinkedInProfile(type)
        if (result.success) {
          setImportProgress(prev => ({ ...prev, [type]: true }))
          // Add delay between imports to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }

      // Get final data
      const fullResult = await importLinkedInProfile('full')
      if (fullResult.success) {
        setImportedData(fullResult.data)
      }
    } catch (err) {
      setError(`Failed to import full profile: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setIsImporting(false)
    }
  }

  const getProgressPercentage = () => {
    const completed = Object.values(importProgress).filter(Boolean).length
    return (completed / 4) * 100
  }

  if (!user?.provider || user.provider !== 'linkedin') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-[#0077B5]" />
            LinkedIn Profile Import
          </CardTitle>
          <CardDescription>
            Import your professional profile from LinkedIn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Linkedin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              You need to login with LinkedIn to import your profile
            </p>
            <Button onClick={() => window.location.href = '/login'}>
              Login with LinkedIn
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Linkedin className="w-5 h-5 text-[#0077B5]" />
          LinkedIn Profile Import
        </CardTitle>
        <CardDescription>
          Import your professional profile from LinkedIn to GrowthLab
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Import Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Import Progress</span>
            <span className="text-sm text-gray-500">
              {Object.values(importProgress).filter(Boolean).length}/4 completed
            </span>
          </div>
          <Progress value={getProgressPercentage()} className="h-2" />
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              {importProgress.basic ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <User className="w-4 h-4 text-gray-400" />
              )}
              <span>Basic Profile</span>
            </div>
            <div className="flex items-center gap-2">
              {importProgress.experience ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Briefcase className="w-4 h-4 text-gray-400" />
              )}
              <span>Work Experience</span>
            </div>
            <div className="flex items-center gap-2">
              {importProgress.education ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <GraduationCap className="w-4 h-4 text-gray-400" />
              )}
              <span>Education</span>
            </div>
            <div className="flex items-center gap-2">
              {importProgress.skills ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Star className="w-4 h-4 text-gray-400" />
              )}
              <span>Skills</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Import Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Import Options</span>
            <Button
              onClick={handleImportAll}
              disabled={isImporting}
              className="bg-[#0077B5] hover:bg-[#006097]"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Import All
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleImport('basic')}
              disabled={isImporting || importProgress.basic}
              className="justify-start"
            >
              <User className="w-4 h-4 mr-2" />
              Basic Profile
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleImport('experience')}
              disabled={isImporting || importProgress.experience}
              className="justify-start"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleImport('education')}
              disabled={isImporting || importProgress.education}
              className="justify-start"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleImport('skills')}
              disabled={isImporting || importProgress.skills}
              className="justify-start"
            >
              <Star className="w-4 h-4 mr-2" />
              Skills
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Imported Data Preview */}
        {importedData && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium">Imported Data Preview</h4>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-xs text-gray-700 overflow-auto">
                  {JSON.stringify(importedData, null, 2)}
                </pre>
              </div>
            </div>
          </>
        )}

        {/* Next Steps */}
        {getProgressPercentage() === 100 && (
          <>
            <Separator />
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h4 className="font-medium text-green-700 mb-2">Profile Import Complete!</h4>
              <p className="text-sm text-gray-600 mb-4">
                Your LinkedIn profile has been successfully imported to GrowthLab
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={() => window.location.href = '/profile'}>
                  View Profile
                </Button>
                <Button onClick={() => window.location.href = '/dashboard'}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
