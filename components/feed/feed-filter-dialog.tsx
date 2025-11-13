"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Check, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeedFilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FeedFilterDialog({ open, onOpenChange }: FeedFilterDialogProps) {
  const [activeTab, setActiveTab] = useState("content")
  const [contentTypes, setContentTypes] = useState<string[]>(["all"])
  const [dateRange, setDateRange] = useState<"anytime" | "past24h" | "pastWeek" | "pastMonth" | "custom">("anytime")
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined)
  const [authors, setAuthors] = useState<string[]>(["all"])
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "relevant">("relevant")

  const handleContentTypeChange = (type: string) => {
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
  }

  const handleAuthorChange = (author: string) => {
    if (author === "all") {
      setAuthors(["all"])
    } else {
      const newAuthors = authors.includes("all")
        ? [author]
        : authors.includes(author)
          ? authors.filter((a) => a !== author)
          : [...authors, author]

      setAuthors(newAuthors.length === 0 ? ["all"] : newAuthors)
    }
  }

  const resetFilters = () => {
    setContentTypes(["all"])
    setDateRange("anytime")
    setCustomDate(undefined)
    setAuthors(["all"])
    setSortBy("relevant")
  }

  const applyFilters = () => {
    // In a real app, this would apply the filters to the feed
    console.log("Applying filters:", { contentTypes, dateRange, customDate, authors, sortBy })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Feed
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="date">Date</TabsTrigger>
            <TabsTrigger value="author">Author</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Content Type</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="content-all"
                    checked={contentTypes.includes("all")}
                    onCheckedChange={() => handleContentTypeChange("all")}
                  />
                  <Label htmlFor="content-all">All Content</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="content-posts"
                    checked={contentTypes.includes("posts")}
                    onCheckedChange={() => handleContentTypeChange("posts")}
                    disabled={contentTypes.includes("all")}
                  />
                  <Label htmlFor="content-posts">Posts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="content-articles"
                    checked={contentTypes.includes("articles")}
                    onCheckedChange={() => handleContentTypeChange("articles")}
                    disabled={contentTypes.includes("all")}
                  />
                  <Label htmlFor="content-articles">Articles</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="content-events"
                    checked={contentTypes.includes("events")}
                    onCheckedChange={() => handleContentTypeChange("events")}
                    disabled={contentTypes.includes("all")}
                  />
                  <Label htmlFor="content-events">Events</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="content-jobs"
                    checked={contentTypes.includes("jobs")}
                    onCheckedChange={() => handleContentTypeChange("jobs")}
                    disabled={contentTypes.includes("all")}
                  />
                  <Label htmlFor="content-jobs">Jobs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="content-polls"
                    checked={contentTypes.includes("polls")}
                    onCheckedChange={() => handleContentTypeChange("polls")}
                    disabled={contentTypes.includes("all")}
                  />
                  <Label htmlFor="content-polls">Polls</Label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Sort By</h3>
              <RadioGroup
                value={sortBy}
                onValueChange={(value) => setSortBy(value as "recent" | "popular" | "relevant")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="relevant" id="sort-relevant" />
                  <Label htmlFor="sort-relevant">Relevant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recent" id="sort-recent" />
                  <Label htmlFor="sort-recent">Most Recent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="popular" id="sort-popular" />
                  <Label htmlFor="sort-popular">Most Popular</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>

          <TabsContent value="date" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Date Range</h3>
              <RadioGroup value={dateRange} onValueChange={(value) => setDateRange(value as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="anytime" id="date-anytime" />
                  <Label htmlFor="date-anytime">Anytime</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="past24h" id="date-past24h" />
                  <Label htmlFor="date-past24h">Past 24 hours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pastWeek" id="date-pastWeek" />
                  <Label htmlFor="date-pastWeek">Past week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pastMonth" id="date-pastMonth" />
                  <Label htmlFor="date-pastMonth">Past month</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="date-custom" />
                  <Label htmlFor="date-custom">Custom date</Label>
                </div>
              </RadioGroup>
            </div>

            {dateRange === "custom" && (
              <div>
                <h3 className="text-sm font-medium mb-3">Select Custom Date</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !customDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {customDate ? format(customDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={customDate} onSelect={setCustomDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </TabsContent>

          <TabsContent value="author" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Author</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="author-all"
                    checked={authors.includes("all")}
                    onCheckedChange={() => handleAuthorChange("all")}
                  />
                  <Label htmlFor="author-all">All Authors</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="author-connections"
                    checked={authors.includes("connections")}
                    onCheckedChange={() => handleAuthorChange("connections")}
                    disabled={authors.includes("all")}
                  />
                  <Label htmlFor="author-connections">My Connections</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="author-following"
                    checked={authors.includes("following")}
                    onCheckedChange={() => handleAuthorChange("following")}
                    disabled={authors.includes("all")}
                  />
                  <Label htmlFor="author-following">People I Follow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="author-verified"
                    checked={authors.includes("verified")}
                    onCheckedChange={() => handleAuthorChange("verified")}
                    disabled={authors.includes("all")}
                  />
                  <Label htmlFor="author-verified">Verified Users</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={resetFilters} className="flex items-center gap-1">
            <X className="h-4 w-4" />
            Reset
          </Button>
          <Button onClick={applyFilters} className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
