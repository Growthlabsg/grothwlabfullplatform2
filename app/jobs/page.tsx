import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Briefcase, 
  Users, 
  Search, 
  Building, 
  Clock, 
  MapPin, 
  ChevronRight, 
  UserPlus, 
  Globe, 
  TrendingUp,
  DollarSign,
  Star,
  Filter,
  Plus,
  Bookmark,
  Share2,
  Eye,
  Calendar,
  Zap
} from "lucide-react"

export default function JobsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Enhanced Hero Section */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0F7377]/10 to-[#1E293B]/10 px-4 py-2 rounded-full mb-6">
          <Zap className="h-4 w-4 text-[#0F7377]" />
          <span className="text-sm font-medium text-[#0F7377]">Live Job Portal</span>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#0F7377] to-[#1E293B] bg-clip-text text-transparent">
          GrowthLab Jobs
        </h1>
        <p className="text-xl text-[#334155] max-w-3xl mx-auto mb-8">
          Connect with top startup talent or find your next opportunity in Asia's most innovative companies.
        </p>
        
        {/* Enhanced Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for jobs, companies, or skills..."
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-[#0F7377] focus:ring-[#0F7377]/20"
              />
            </div>
            <Select>
              <SelectTrigger className="h-12 w-48 border-2 border-gray-200 focus:border-[#0F7377]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="singapore">Singapore</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="asia">Asia Pacific</SelectItem>
              </SelectContent>
            </Select>
            <Button size="lg" className="h-12 px-8 bg-[#0F7377] hover:bg-[#0F7377]/90">
              <Search className="w-5 h-5 mr-2" />
              Search Jobs
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0F7377] mb-2">2,847</div>
            <div className="text-sm text-gray-600">Active Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0F7377] mb-2">156</div>
            <div className="text-sm text-gray-600">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0F7377] mb-2">12.4k</div>
            <div className="text-sm text-gray-600">Candidates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0F7377] mb-2">89%</div>
            <div className="text-sm text-gray-600">Hire Rate</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="mb-8 grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="hire" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Hire Talent
          </TabsTrigger>
          <TabsTrigger value="find" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Find Jobs
          </TabsTrigger>
          <TabsTrigger value="cofounder" className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Find Co-founder
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Featured Jobs Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Jobs</h2>
              <Button variant="outline" asChild>
                <Link href="/jobs/find-startup-jobs">View All Jobs</Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Job Card 1 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-[#0F7377]/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-[#0F7377] transition-colors">
                          Senior Full Stack Developer
                        </CardTitle>
                        <p className="text-sm text-gray-600">TechNova Solutions</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Singapore
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Full-time
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-[#0F7377]/10 text-[#0F7377]">
                        React
                      </Badge>
                      <Badge variant="secondary" className="bg-[#0F7377]/10 text-[#0F7377]">
                        Node.js
                      </Badge>
                      <Badge variant="secondary" className="bg-[#0F7377]/10 text-[#0F7377]">
                        TypeScript
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      $6,000 - $8,000 / month
                    </div>
                  </div>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Featured Job Card 2 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-[#0F7377]/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-[#0F7377] transition-colors">
                          Growth Marketing Manager
                        </CardTitle>
                        <p className="text-sm text-gray-600">StartupX</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Remote
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Full-time
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-[#0F7377]/10 text-[#0F7377]">
                        Digital Marketing
                      </Badge>
                      <Badge variant="secondary" className="bg-[#0F7377]/10 text-[#0F7377]">
                        Analytics
                      </Badge>
                      <Badge variant="secondary" className="bg-[#0F7377]/10 text-[#0F7377]">
                        Growth
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      $5,000 - $7,000 / month
                    </div>
                  </div>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Featured Job Card 3 */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-[#0F7377]/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-[#0F7377] transition-colors">
                          Product Designer
                        </CardTitle>
                        <p className="text-sm text-gray-600">DesignHub</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Hybrid
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Full-time
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-[#0F7377]/10 text-[#0F7377]">
                        UI/UX
                      </Badge>
                      <Badge variant="secondary" className="bg-[#0F7377]/10 text-[#0F7377]">
                        Figma
                      </Badge>
                      <Badge variant="secondary" className="bg-[#0F7377]/10 text-[#0F7377]">
                        Prototyping
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      $4,500 - $6,500 / month
                    </div>
                  </div>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-[#0F7377]/10 hover:border-[#0F7377]/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-[#0F7377]" />
                  For Employers
                </CardTitle>
                <CardDescription>Hire top talent for your startup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Access a curated pool of skilled professionals eager to join innovative startups. Post jobs,
                    review applications, and connect with candidates.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-[#0F7377] hover:bg-[#0F7377]/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      <Link href="/jobs/hire-talents">
                        <Plus className="w-4 h-4 mr-2" />
                        Post a Job
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="border-2 border-gray-300 hover:border-[#0F7377] transition-all duration-200">
                      <Link href="/jobs/applications">View Applications</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#0F7377]/10 hover:border-[#0F7377]/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-[#0F7377]" />
                  For Job Seekers
                </CardTitle>
                <CardDescription>Find your next role in a fast-growing startup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Discover exciting opportunities at innovative startups across Asia. Browse job listings, apply
                    with ease, and take the next step in your career.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-[#0F7377] hover:bg-[#0F7377]/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      <Link href="/jobs/find-startup-jobs">
                        <Search className="w-4 h-4 mr-2" />
                        Browse Jobs
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="border-2 border-gray-300 hover:border-[#0F7377] transition-all duration-200">
                      <Link href="/profile/resume">Update Profile</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="border-2 border-[#0F7377]/10 hover:border-[#0F7377]/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="mr-2 h-5 w-5 text-[#0F7377]" />
                  Find a Co-founder
                </CardTitle>
                <CardDescription>Connect with potential co-founders for your startup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Finding the right co-founder is crucial for startup success. Our platform helps you connect with
                    like-minded entrepreneurs who complement your skills and share your vision.
                  </p>
                  <Button asChild className="bg-[#0F7377] hover:bg-[#0F7377]/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    <Link href="/jobs/find-cofounder">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Find a Co-founder
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hire">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#0F7377]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#0F7377]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Hire Top Talent</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Access our curated pool of skilled professionals and find the perfect fit for your startup. 
              Post jobs, review applications, and connect with candidates seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#0F7377] hover:bg-[#0F7377]/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <Link href="/jobs/hire-talents">
                  <Plus className="w-5 h-5 mr-2" />
                  Post a Job
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-2 border-gray-300 hover:border-[#0F7377] transition-all duration-200">
                <Link href="/jobs/applications">View Applications</Link>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="find">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#0F7377]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#0F7377]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Find Your Next Opportunity</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover exciting opportunities at innovative startups across Asia. Browse job listings, 
              apply with ease, and take the next step in your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#0F7377] hover:bg-[#0F7377]/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <Link href="/jobs/find-startup-jobs">
                  <Search className="w-5 h-5 mr-2" />
                  Browse Jobs
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-2 border-gray-300 hover:border-[#0F7377] transition-all duration-200">
                <Link href="/profile/resume">Update Profile</Link>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cofounder">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#0F7377]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-[#0F7377]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Find Your Co-founder</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Finding the right co-founder is crucial for startup success. Our platform helps you connect with
              like-minded entrepreneurs who complement your skills and share your vision.
            </p>
            <Button asChild size="lg" className="bg-[#0F7377] hover:bg-[#0F7377]/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Link href="/jobs/find-cofounder">
                <UserPlus className="w-5 h-5 mr-2" />
                Find a Co-founder
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
