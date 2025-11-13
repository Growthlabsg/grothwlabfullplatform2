"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, MessageCircle, Star } from "lucide-react"

interface DiscoveryItem {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  mutualConnections: number
  tags: string[]
  compatibility: number
}

export function SmartDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTag, setFilterTag] = useState("all")

  const mockDiscoveries: DiscoveryItem[] = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechFlow Solutions",
      avatar: "SC",
      mutualConnections: 8,
      tags: ["Product", "SaaS", "B2B"],
      compatibility: 92
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      role: "Frontend Developer",
      company: "Innovation Labs",
      avatar: "MR",
      mutualConnections: 12,
      tags: ["React", "TypeScript", "UI/UX"],
      compatibility: 87
    },
    {
      id: "3",
      name: "Emily Watson",
      role: "Marketing Director",
      company: "Growth Marketing Co",
      avatar: "EW",
      mutualConnections: 5,
      tags: ["Growth", "Digital", "B2C"],
      compatibility: 78
    }
  ]

  const filteredDiscoveries = mockDiscoveries.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterTag === "all" || item.tags.includes(filterTag)
    return matchesSearch && matchesFilter
  })

  const allTags = Array.from(new Set(mockDiscoveries.flatMap(item => item.tags)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Discovery</h2>
          <p className="text-gray-600">Find new connections based on your interests and network</p>
        </div>
        <Button variant="outline" size="sm">
          <Users className="h-4 w-4 mr-2" />
          View All
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, role, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* Discovery Results */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDiscoveries.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                      {item.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{item.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{item.compatibility}%</span>
                  </div>
                  <p className="text-xs text-gray-500">Match</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600">
                <p className="font-medium">{item.company}</p>
                <p className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{item.mutualConnections} mutual connections</span>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Message
                </Button>
                <Button size="sm" className="flex-1">
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiscoveries.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
}
