"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Briefcase,
  Calendar,
  Search,
  Users,
  Building2,
  ArrowRight,
  PlusCircle,
  LineChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function JobsClient() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs Platform</h1>
          <p className="text-muted-foreground mt-1">
            Find your next opportunity or hire top talent in Singapore's startup ecosystem
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="bg-[#0F7377] text-white">
          <CardHeader>
            <CardTitle className="text-white">For Job Seekers</CardTitle>
            <CardDescription className="text-white/80">
              Find your next opportunity in Singapore's startup ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                <Input
                  placeholder="Search for jobs..."
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/30"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      router.push(`/jobs/browse?q=${e.currentTarget.value}`)
                    }
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" asChild className="bg-white/10 hover:bg-white/20 text-white border-0">
                  <Link href="/jobs/browse">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Browse Jobs
                  </Link>
                </Button>
                <Button variant="secondary" asChild className="bg-white/10 hover:bg-white/20 text-white border-0">
                  <Link href="/jobs/profile">
                    <Users className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="secondary" className="w-full bg-white text-[#0F7377] hover:bg-white/90">
              <Link href="/jobs/browse">
                Find Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
            <CardDescription>Post jobs and find the right talent for your company</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild>
                  <Link href="/jobs/post">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Post a Job
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/jobs/dashboard">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/jobs/applications">
                    <Users className="mr-2 h-4 w-4" />
                    Applications
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/jobs/interviews">
                    <Calendar className="mr-2 h-4 w-4" />
                    Interviews
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/jobs/post">
                Post a Job <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Companies</CardTitle>
            <CardDescription>Build your employer brand and attract top talent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild>
                  <Link href="/companies/profile">
                    <Building2 className="mr-2 h-4 w-4" />
                    Company Profile
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/jobs/analytics">
                    <LineChart className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
              </div>
              <div className="relative rounded-md overflow-hidden h-24">
                <Image
                  src="/interconnected-brand-elements.png"
                  alt="Company branding illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/companies/profile">
                Manage Company <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Featured Jobs</CardTitle>
            <CardDescription>Highlighted opportunities from top companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      <Link href={`/jobs/${i}`} className="hover:underline">
                        {i === 1 ? "Senior Product Designer" : i === 2 ? "Full Stack Developer" : "Marketing Manager"}
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {i === 1 ? "DesignHub" : i === 2 ? "TechNova" : "GrowthGenius"} · Singapore
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/jobs/browse">
                View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Networking and career opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      <Link href={`/events/${i}`} className="hover:underline">
                        {i === 1 ? "Tech Talent Mixer" : i === 2 ? "Startup Job Fair" : "Career Development Workshop"}
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {i === 1 ? "May 15, 2023" : i === 2 ? "May 22, 2023" : "June 5, 2023"} · Singapore
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/events">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resources for Job Seekers</CardTitle>
          <CardDescription>Helpful guides and tools to advance your career</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Resume Builder",
                description: "Create a professional resume that stands out",
                icon: <FileText className="h-5 w-5" />,
                link: "/resources/resume-builder",
              },
              {
                title: "Interview Preparation",
                description: "Tips and practice for acing your interviews",
                icon: <MessageSquare className="h-5 w-5" />,
                link: "/resources/interview-prep",
              },
              {
                title: "Salary Guide",
                description: "Benchmark salaries for tech roles in Singapore",
                icon: <DollarSign className="h-5 w-5" />,
                link: "/resources/salary-guide",
              },
            ].map((resource, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0F7377]/10 text-[#0F7377]">
                    {resource.icon}
                  </div>
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild variant="ghost" size="sm" className="w-full justify-start px-0">
                    <Link href={resource.link}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { FileText, MessageSquare, DollarSign } from "lucide-react"
