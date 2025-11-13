"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useJobs } from "@/contexts/JobContext"
import {
  Search, 
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Building, 
  Users, 
  Star,
  Heart,
  Eye,
  Briefcase,
  Globe,
  TrendingUp,
  Target,
  Award,
  Plus,
  Bookmark,
  Share2,
  Send,
  Calendar,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  BarChart3,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Bell,
  MessageSquare,
  Phone,
  Video,
  Mail,
  Linkedin,
  Github,
  Twitter,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  SortAsc,
  SortDesc,
  Grid,
  List,
  SlidersHorizontal
} from "lucide-react"
import Link from "next/link"

export default function FindStartupJobsPage() {
  const { toast } = useToast()
  const { 
    jobs, 
    savedJobs, 
    applications,
    saveJob, 
    unsaveJob, 
    applyToJob, 
    withdrawApplication,
    isJobSaved,
    hasApplied,
    filterJobs
  } = useJobs()

  const [isMobile, setIsMobile] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [showJobDetails, setShowJobDetails] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"recent" | "salary" | "company" | "match">("recent")
  const [filters, setFilters] = useState({
    location: [] as string[],
    type: [] as string[],
    experience: [] as string[],
    salaryMin: 0,
    salaryMax: 100000,
    remoteWork: [] as string[],
    industry: [] as string[],
    companySize: [] as string[],
    fundingStage: [] as string[],
    skills: [] as string[],
    benefits: [] as string[],
    featured: false,
    visaSponsorship: false
  })
  const [filteredJobs, setFilteredJobs] = useState(jobs)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [applicationData, setApplicationData] = useState({
    coverLetter: "",
    resume: null as File | null,
    portfolio: "",
    linkedin: "",
    github: "",
    expectedSalary: "",
    availability: "",
    noticePeriod: "",
    additionalInfo: ""
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const filtered = filterJobs({
      search: searchQuery,
      location: filters.location,
      type: filters.type,
      experience: filters.experience,
      salaryMin: filters.salaryMin,
      salaryMax: filters.salaryMax,
      remoteWork: filters.remoteWork,
      industry: filters.industry,
      companySize: filters.companySize,
      fundingStage: filters.fundingStage,
      skills: filters.skills,
      benefits: filters.benefits,
      featured: filters.featured ? true : undefined,
      visaSponsorship: filters.visaSponsorship ? true : undefined
    })
    setFilteredJobs(filtered)
  }, [searchQuery, filters, jobs])

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveJob = (job: any) => {
    if (isJobSaved(job.id)) {
      unsaveJob(job.id)
      toast({
        title: "Job Unsaved",
        description: `${job.title} has been removed from your saved jobs`,
      })
    } else {
      saveJob(job.id)
      toast({
        title: "Job Saved",
        description: `${job.title} has been saved to your favorites`,
      })
    }
  }

  const handleApplyToJob = (job: any) => {
    if (hasApplied(job.id)) {
      withdrawApplication(job.id)
      toast({
        title: "Application Withdrawn",
        description: `Your application for ${job.title} has been withdrawn`,
      })
    } else {
      setSelectedJob(job)
      setShowApplicationForm(true)
    }
  }

  const handleSubmitApplication = () => {
    if (selectedJob) {
      applyToJob(selectedJob.id)
      toast({
        title: "Application Submitted",
        description: `Your application for ${selectedJob.title} has been submitted successfully`,
      })
      setShowApplicationForm(false)
      setApplicationData({
        coverLetter: "",
        resume: null,
        portfolio: "",
        linkedin: "",
        github: "",
        expectedSalary: "",
        availability: "",
        noticePeriod: "",
        additionalInfo: ""
      })
    }
  }

  const handleShareJob = (job: any) => {
    const shareText = `Check out this job: ${job.title} at ${job.company} - ${job.location}`
    navigator.clipboard.writeText(shareText)
    toast({
      title: "Job Shared",
      description: "Job link copied to clipboard",
    })
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800 border-green-200"
    if (score >= 70) return "bg-blue-100 text-blue-800 border-blue-200"
    if (score >= 50) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const sortJobs = (jobsToSort: any[], sortType: string) => {
    switch (sortType) {
      case "recent":
        return [...jobsToSort].sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())
      case "salary":
        return [...jobsToSort].sort((a, b) => b.salaryMax - a.salaryMax)
      case "company":
        return [...jobsToSort].sort((a, b) => a.company.localeCompare(b.company))
      case "match":
        return [...jobsToSort].sort((a, b) => b.matchScore - a.matchScore)
      default:
        return jobsToSort
    }
  }

  const sortedJobs = sortJobs(filteredJobs, sortBy)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
      <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Startup Jobs</h1>
              <p className="text-gray-600 mt-2">
                Discover exciting opportunities at innovative startups and scale-ups
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="flex items-center gap-2"
              >
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                {viewMode === "grid" ? "List View" : "Grid View"}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <Link href="/jobs/hire-talents">
                <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Post a Job
                </Button>
              </Link>
            </div>
      </div>

                {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Jobs</p>
                    <p className="text-2xl font-bold">{filteredJobs.length}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-[#0F7377]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Featured Jobs</p>
                    <p className="text-2xl font-bold">
                      {filteredJobs.filter(job => job.featured).length}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Remote Jobs</p>
                    <p className="text-2xl font-bold">
                      {filteredJobs.filter(job => job.remoteWork === "Remote").length}
                    </p>
                  </div>
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Visa Sponsorship</p>
                    <p className="text-2xl font-bold">
                      {filteredJobs.filter(job => job.visaSponsorship).length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
          </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
              </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                      placeholder="Job title, company, skills..." 
                      className="pl-9" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Location</Label>
                  <div className="space-y-2">
                    {["Singapore", "San Francisco", "London", "Remote", "Hybrid"].map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={location}
                          checked={filters.location.includes(location)}
                          onCheckedChange={(checked) => {
                            const newLocations = checked 
                              ? [...filters.location, location]
                              : filters.location.filter(l => l !== location)
                            handleFilterChange('location', newLocations)
                          }}
                        />
                        <Label htmlFor={location} className="text-sm">{location}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Type */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Job Type</Label>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={filters.type.includes(type)}
                          onCheckedChange={(checked) => {
                            const newTypes = checked 
                              ? [...filters.type, type]
                              : filters.type.filter(t => t !== type)
                            handleFilterChange('type', newTypes)
                          }}
                        />
                        <Label htmlFor={type} className="text-sm">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Experience</Label>
                  <div className="space-y-2">
                    {["Entry", "Mid-level", "Senior", "Executive"].map((exp) => (
                      <div key={exp} className="flex items-center space-x-2">
                        <Checkbox
                          id={exp}
                          checked={filters.experience.includes(exp)}
                          onCheckedChange={(checked) => {
                            const newExp = checked 
                              ? [...filters.experience, exp]
                              : filters.experience.filter(e => e !== exp)
                            handleFilterChange('experience', newExp)
                          }}
                        />
                        <Label htmlFor={exp} className="text-sm">{exp}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Salary Range</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.salaryMin || ""}
                        onChange={(e) => handleFilterChange('salaryMin', parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                      <span className="text-sm text-gray-500">to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.salaryMax || ""}
                        onChange={(e) => handleFilterChange('salaryMax', parseInt(e.target.value) || 100000)}
                        className="w-20"
                      />
                      </div>
                  </div>
                </div>

                {/* Remote Work */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Remote Work</Label>
                  <div className="space-y-2">
                    {["Remote", "Hybrid", "On-site"].map((remote) => (
                      <div key={remote} className="flex items-center space-x-2">
                        <Checkbox
                          id={remote}
                          checked={filters.remoteWork.includes(remote)}
                          onCheckedChange={(checked) => {
                            const newRemote = checked 
                              ? [...filters.remoteWork, remote]
                              : filters.remoteWork.filter(r => r !== remote)
                            handleFilterChange('remoteWork', newRemote)
                          }}
                        />
                        <Label htmlFor={remote} className="text-sm">{remote}</Label>
                    </div>
                    ))}
                  </div>
                </div>

                {/* Visa Sponsorship */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Visa Sponsorship</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="visaSponsorship"
                        checked={filters.visaSponsorship}
                        onCheckedChange={(checked) => handleFilterChange('visaSponsorship', checked)}
                      />
                      <Label htmlFor="visaSponsorship" className="text-sm">Offers Visa Sponsorship</Label>
                      </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setFilters({
                      location: [],
                      type: [],
                      experience: [],
                      salaryMin: 0,
                      salaryMax: 100000,
                      remoteWork: [],
                      industry: [],
                      companySize: [],
                      fundingStage: [],
                      skills: [],
                      benefits: [],
                      featured: false,
                      visaSponsorship: false
                    })
                    setSearchQuery("")
                  }}
                >
                  Clear All Filters
                  </Button>
              </CardContent>
            </Card>
          </div>

          {/* Jobs Grid */}
          <div className="lg:col-span-3">
            {/* Sort and View Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="salary">Highest Salary</SelectItem>
                    <SelectItem value="company">Company A-Z</SelectItem>
                    <SelectItem value="match">Best Match</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-600">
                  {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>

            {/* Jobs List */}
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 gap-6">
                {sortedJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-[#0F7377] rounded-lg flex items-center justify-center text-white font-bold">
                            {job.companyLogo}
                      </div>
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                    </div>
                  </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleSaveJob(job)}
                          >
                            <Bookmark className={`h-4 w-4 ${isJobSaved(job.id) ? 'fill-current text-[#0F7377]' : ''}`} />
                </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleShareJob(job)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
          </div>
        </div>

                      {/* Job Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.type}
              </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {job.experience}
            </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {job.salary}
                </div>
                </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={getMatchScoreColor(job.matchScore)}>
                            {job.matchScore}% Match
                          </Badge>
                          <Badge variant="outline" className={getUrgencyColor(job.urgency)}>
                            {job.urgency} Priority
                          </Badge>
                          {job.jobCategory && (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                              {job.jobCategory}
                            </Badge>
                          )}
                          {job.subCategory && (
                            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                              {job.subCategory}
                            </Badge>
                          )}
                          {job.visaSponsorship && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Visa Sponsorship
                            </Badge>
                          )}
                          {job.featured && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                </div>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 3).map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.skills.length - 3} more
                            </Badge>
                          )}
                </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                          onClick={() => handleApplyToJob(job)}
                        >
                          {hasApplied(job.id) ? "Applied" : "Apply Now"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedJob(job)
                            setShowJobDetails(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
            ) : (
          <div className="space-y-4">
                {sortedJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#0F7377] rounded-lg flex items-center justify-center text-white font-bold">
                            {job.companyLogo}
                    </div>
                        <div>
                            <h3 className="font-semibold">{job.title}</h3>
                            <p className="text-sm text-gray-600">{job.company}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {job.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                {job.salary}
                              </span>
                          </div>
                        </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge variant="outline" className={getMatchScoreColor(job.matchScore)}>
                            {job.matchScore}% Match
                          </Badge>
                              {job.jobCategory && (
                                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                                  {job.jobCategory}
                          </Badge>
                              )}
                              {job.subCategory && (
                                <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                                  {job.subCategory}
                            </Badge>
                              )}
                              {job.visaSponsorship && (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Visa
                            </Badge>
                          )}
                        </div>
                      </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleSaveJob(job)}>
                              <Bookmark className={`h-4 w-4 ${isJobSaved(job.id) ? 'fill-current text-[#0F7377]' : ''}`} />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleShareJob(job)}>
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button size="sm" onClick={() => handleApplyToJob(job)}>
                              {hasApplied(job.id) ? "Applied" : "Apply"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredJobs.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="mb-4">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your filters to find more job opportunities.
                    </p>
                    <Button onClick={() => {
                      setFilters({
                        location: [],
                        type: [],
                        experience: [],
                        salaryMin: 0,
                        salaryMax: 100000,
                        remoteWork: [],
                        industry: [],
                        companySize: [],
                        fundingStage: [],
                        skills: [],
                        benefits: [],
                        featured: false,
                        visaSponsorship: false
                      })
                      setSearchQuery("")
                    }}>
                      Clear All Filters
                    </Button>
                        </div>
                </CardContent>
              </Card>
            )}
                        </div>
                        </div>
                        </div>

      {/* Job Details Modal */}
      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Job Details</DialogTitle>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#0F7377] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {selectedJob.companyLogo}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                    <p className="text-gray-600">{selectedJob.company}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {selectedJob.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedJob.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {selectedJob.salary}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleSaveJob(selectedJob)}>
                    <Bookmark className={`h-4 w-4 mr-2 ${isJobSaved(selectedJob.id) ? 'fill-current text-[#0F7377]' : ''}`} />
                    {isJobSaved(selectedJob.id) ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShareJob(selectedJob)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Match Score */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Match Score</h3>
                  <span className="text-2xl font-bold text-[#0F7377]">{selectedJob.matchScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#0F7377] h-2 rounded-full" 
                    style={{ width: `${selectedJob.matchScore}%` }}
                  ></div>
                        </div>
                      </div>
                      
                      {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-semibold mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
                      
                      {/* Skills */}
              <div>
                <h3 className="font-semibold mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-semibold mb-3">Benefits & Perks</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedJob.benefits.map((benefit: string) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-[#0F7377]" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                      </div>
                      
                      {/* Company Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Company Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Size: {selectedJob.companySize}</span>
                        </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Stage: {selectedJob.fundingStage}</span>
                        </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Industry: {selectedJob.industry}</span>
                        </div>
                      </div>
                      </div>
                      
                <div>
                  <h3 className="font-semibold mb-3">Job Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Team Size: {selectedJob.teamSize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Posted: {selectedJob.posted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Remote: {selectedJob.remoteWork}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button variant="outline" onClick={() => setShowJobDetails(false)}>
                  Close
                          </Button>
                <Button 
                  className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                  onClick={() => {
                    setShowJobDetails(false)
                    handleApplyToJob(selectedJob)
                  }}
                >
                  <Send className="h-4 w-4 mr-2" />
                            Apply Now
                          </Button>
                        </div>
                      </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Form Modal */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Apply for {selectedJob?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="coverLetter">Cover Letter *</Label>
              <Textarea 
                id="coverLetter"
                placeholder="Tell us why you're interested in this position..."
                rows={4}
                value={applicationData.coverLetter}
                onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
              />
                    </div>

            <div>
              <Label htmlFor="resume">Resume *</Label>
              <Input 
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setApplicationData(prev => ({ ...prev, resume: e.target.files?.[0] || null }))}
              />
                  </div>

            <div>
              <Label htmlFor="portfolio">Portfolio/Website</Label>
              <Input 
                id="portfolio"
                placeholder="https://yourportfolio.com"
                value={applicationData.portfolio}
                onChange={(e) => setApplicationData(prev => ({ ...prev, portfolio: e.target.value }))}
              />
          </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input 
                  id="linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={applicationData.linkedin}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, linkedin: e.target.value }))}
                />
                  </div>
              <div>
                <Label htmlFor="github">GitHub Profile</Label>
                <Input 
                  id="github"
                  placeholder="https://github.com/yourusername"
                  value={applicationData.github}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, github: e.target.value }))}
                />
                  </div>
                </div>
                
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedSalary">Expected Salary</Label>
                <Input 
                  id="expectedSalary"
                  placeholder="e.g., $8,000 - $12,000"
                  value={applicationData.expectedSalary}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, expectedSalary: e.target.value }))}
                />
                  </div>
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select 
                  value={applicationData.availability} 
                  onValueChange={(value) => setApplicationData(prev => ({ ...prev, availability: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="2weeks">2 weeks</SelectItem>
                    <SelectItem value="1month">1 month</SelectItem>
                    <SelectItem value="2months">2 months</SelectItem>
                    <SelectItem value="3months">3+ months</SelectItem>
                  </SelectContent>
                </Select>
                </div>
              </div>
              
            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea 
                id="additionalInfo"
                placeholder="Any additional information you'd like to share..."
                rows={3}
                value={applicationData.additionalInfo}
                onChange={(e) => setApplicationData(prev => ({ ...prev, additionalInfo: e.target.value }))}
              />
                </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button variant="outline" onClick={() => setShowApplicationForm(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                onClick={handleSubmitApplication}
                disabled={!applicationData.coverLetter || !applicationData.resume}
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}