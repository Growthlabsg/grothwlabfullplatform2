"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Building, MapPin, Users, Eye, Search, Filter, Grid, List, ArrowRight, Globe, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BusinessPageService } from "@/lib/business-page-service"
import type { BusinessPage } from "@/types/business-page"

export function StartupDirectory() {
  const [businesses, setBusinesses] = useState<BusinessPage[]>([])
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("followers")

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = await BusinessPageService.getAllBusinessPages()
        setBusinesses(data)
        setFilteredBusinesses(data)
      } catch (error) {
        console.error("Error fetching businesses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinesses()
  }, [])

  useEffect(() => {
    let filtered = businesses

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.industry.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Industry filter
    if (selectedIndustry !== "all") {
      filtered = filtered.filter((business) => business.industry === selectedIndustry)
    }

    // Location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter((business) => business.location === selectedLocation)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "followers":
          return b.followers - a.followers
        case "name":
          return a.name.localeCompare(b.name)
        case "founded":
          return (b.foundedYear || 0) - (a.foundedYear || 0)
        case "views":
          return (b.views || 0) - (a.views || 0)
        default:
          return 0
      }
    })

    setFilteredBusinesses(filtered)
  }, [businesses, searchTerm, selectedIndustry, selectedLocation, sortBy])

  const industries = Array.from(new Set(businesses.map((b) => b.industry)))
  const locations = Array.from(new Set(businesses.map((b) => b.location).filter(Boolean)))

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Startup Directory</h2>
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="h-48 bg-gray-200 animate-pulse" />
              </CardHeader>
              <CardContent className="pt-6 pb-2">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Startup Directory</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Discover and connect with innovative startups and businesses in the GrowthLab ecosystem
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {filteredBusinesses.length} businesses
            </Badge>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search businesses, industries, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-gray-300 focus:ring-2 focus:ring-[#0F7377]/20"
            />
          </div>
          
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-full sm:w-48 rounded-xl">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full sm:w-48 rounded-xl">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="followers">Followers</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="founded">Founded</SelectItem>
              <SelectItem value="views">Views</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border border-gray-300 rounded-xl overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredBusinesses.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <Building className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-medium">No businesses found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search criteria or filters to discover more businesses.
              </p>
            </div>
            <Button 
              onClick={() => {
                setSearchTerm("")
                setSelectedIndustry("all")
                setSelectedLocation("all")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredBusinesses.map((business) => (
            <Card key={business.id} className={`group hover:shadow-lg transition-all duration-300 border-0 shadow-md ${
              viewMode === "list" ? "flex" : ""
            }`}>
              <div className="relative">
                <Image
                  src={business.coverImage || "/placeholder.svg"}
                  alt={business.name}
                  width={400}
                  height={200}
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === "list" ? "w-64 h-48" : "w-full h-48"
                  }`}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                    {business.industry}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {business.followers > 1000 ? `${(business.followers / 1000).toFixed(1)}k` : business.followers}
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 relative rounded-xl overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                    <Image
                      src={business.logo || "/placeholder.svg"}
                      alt={business.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#0F7377] transition-colors truncate">
                      {business.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {business.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {business.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {business.followers.toLocaleString()} followers
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {(business.views || 0).toLocaleString()} views
                      </div>
                      {business.foundedYear && (
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Founded {business.foundedYear}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Button 
                    className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90" 
                    asChild
                  >
                    <Link href={`/business/${business.handle}`}>
                      View Business
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {business.website && (
                    <Button variant="outline" asChild>
                      <Link href={business.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
