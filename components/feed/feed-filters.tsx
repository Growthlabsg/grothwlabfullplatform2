"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  Globe,
  Users,
  TrendingUp,
  Clock,
  ChevronDown,
  Bookmark,
  Star,
  Filter,
  Calendar,
  ImageIcon,
  FileText,
  Video,
  BarChart2,
  SlidersHorizontal,
  Check,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

type FilterType = "all" | "following" | "trending" | "recent" | "saved" | "featured"
type SortType = "recent" | "popular" | "trending"
type TimeRangeType = "today" | "this-week" | "this-month" | "all-time"
type ContentType = "all" | "text" | "image" | "document" | "link" | "video" | "poll" | "event" | "article"

export function FeedFilters() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [activeSort, setActiveSort] = useState<SortType>("recent")
  const [timeRange, setTimeRange] = useState<TimeRangeType>("all-time")
  const [contentTypes, setContentTypes] = useState<ContentType[]>(["all"])
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  const handleFilterChange = (value: string) => {
    setActiveFilter(value as FilterType)
  }

  const handleSortChange = (value: SortType) => {
    setActiveSort(value)
  }

  const handleTimeRangeChange = (value: TimeRangeType) => {
    setTimeRange(value)
    updateActiveFiltersCount()
  }

  const handleContentTypeChange = (type: ContentType) => {
    if (type === "all") {
      setContentTypes(["all"])
    } else {
      const newTypes = contentTypes.includes("all")
        ? [type]
        : contentTypes.includes(type)
          ? contentTypes.filter((t) => t !== type)
          : [...contentTypes, type]

      setContentTypes(newTypes.length === 0 ? ["all"] : newTypes)
    }
    updateActiveFiltersCount()
  }

  const updateActiveFiltersCount = () => {
    let count = 0
    if (timeRange !== "all-time") count++
    if (!contentTypes.includes("all")) count++
    setActiveFiltersCount(count)
  }

  const resetFilters = () => {
    setTimeRange("all-time")
    setContentTypes(["all"])
    setActiveFiltersCount(0)
  }

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" className="w-full" onValueChange={handleFilterChange}>
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">All</span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Following</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Recent</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="featured" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Featured</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">
          {activeFilter === "all" && "All Posts"}
          {activeFilter === "following" && "Posts from People You Follow"}
          {activeFilter === "trending" && "Trending Posts"}
          {activeFilter === "recent" && "Recent Posts"}
          {activeFilter === "saved" && "Saved Posts"}
          {activeFilter === "featured" && "Featured Posts"}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Time Range</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={timeRange}
                        onValueChange={(value) => handleTimeRangeChange(value as TimeRangeType)}
                      >
                        <DropdownMenuRadioItem value="today">
                          Today
                          {timeRange === "today" && <Check className="h-4 w-4 ml-auto" />}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="this-week">
                          This Week
                          {timeRange === "this-week" && <Check className="h-4 w-4 ml-auto" />}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="this-month">
                          This Month
                          {timeRange === "this-month" && <Check className="h-4 w-4 ml-auto" />}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="all-time">
                          All Time
                          {timeRange === "all-time" && <Check className="h-4 w-4 ml-auto" />}
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">Content Type</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={contentTypes.includes("all")}
                  onCheckedChange={() => handleContentTypeChange("all")}
                >
                  All Types
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={contentTypes.includes("text")}
                  onCheckedChange={() => handleContentTypeChange("text")}
                  disabled={contentTypes.includes("all")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Text
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={contentTypes.includes("image")}
                  onCheckedChange={() => handleContentTypeChange("image")}
                  disabled={contentTypes.includes("all")}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Images
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={contentTypes.includes("video")}
                  onCheckedChange={() => handleContentTypeChange("video")}
                  disabled={contentTypes.includes("all")}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Videos
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={contentTypes.includes("document")}
                  onCheckedChange={() => handleContentTypeChange("document")}
                  disabled={contentTypes.includes("all")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={contentTypes.includes("poll")}
                  onCheckedChange={() => handleContentTypeChange("poll")}
                  disabled={contentTypes.includes("all")}
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Polls
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center mt-1"
                onClick={resetFilters}
                disabled={timeRange === "all-time" && contentTypes.includes("all")}
              >
                Reset Filters
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Sort by:</span>
                <span className="font-medium capitalize">{activeSort}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSortChange("recent")}>
                <Clock className="h-4 w-4 mr-2" />
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("popular")}>
                <Star className="h-4 w-4 mr-2" />
                Most Popular
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("trending")}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
