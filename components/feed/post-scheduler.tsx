"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, addDays, setHours, setMinutes } from "date-fns"
import { CalendarIcon, Clock, ImageIcon, Check, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PostSchedulerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PostScheduler({ open, onOpenChange }: PostSchedulerProps) {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(addDays(new Date(), 1))
  const [scheduledTime, setScheduledTime] = useState<string>("09:00")
  const [postContent, setPostContent] = useState("")
  const [attachments, setAttachments] = useState<string[]>([])

  // Mock data for scheduled posts
  const scheduledPosts = [
    {
      id: 1,
      content: "Excited to announce our upcoming webinar on startup funding strategies! Join us next week.",
      scheduledFor: addDays(new Date(), 2),
      attachments: ["/placeholder.svg?key=hd385"],
    },
    {
      id: 2,
      content: "New blog post: 10 Tips for Finding the Perfect Co-founder. Check it out on our website!",
      scheduledFor: addDays(new Date(), 5),
      attachments: [],
    },
  ]

  // Mock data for published posts
  const publishedPosts = [
    {
      id: 3,
      content: "Thanks to everyone who attended our pitch competition yesterday! Congratulations to all participants.",
      publishedAt: addDays(new Date(), -2),
      stats: { likes: 45, comments: 12, shares: 8 },
    },
    {
      id: 4,
      content: "We're hiring! Looking for talented developers to join our growing team.",
      publishedAt: addDays(new Date(), -5),
      stats: { likes: 32, comments: 8, shares: 15 },
    },
  ]

  const handleSchedulePost = () => {
    // In a real app, this would send the scheduled post to a server
    console.log("Scheduling post:", {
      content: postContent,
      scheduledFor: setMinutes(
        setHours(scheduledDate || new Date(), Number.parseInt(scheduledTime.split(":")[0])),
        Number.parseInt(scheduledTime.split(":")[1]),
      ),
      attachments,
    })
    setPostContent("")
    setAttachments([])
    setActiveTab("upcoming")
  }

  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        options.push(`${formattedHour}:${formattedMinute}`)
      }
    }
    return options
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Post Scheduler
          </SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({scheduledPosts.length})</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Post Content</h3>
              <Textarea
                placeholder="What do you want to share?"
                className="min-h-[120px] resize-none"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment, index) => (
                <div key={index} className="relative rounded-md overflow-hidden w-20 h-20">
                  <img src={attachment || "/placeholder.svg"} alt="Attachment" className="w-full h-full object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-5 w-5"
                    onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-20 h-20 flex flex-col items-center justify-center"
                onClick={() => setAttachments([...attachments, "/placeholder.svg?key=rhkrb"])}
              >
                <ImageIcon className="h-6 w-6 mb-1" />
                <span className="text-xs">Add Media</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Schedule Date</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !scheduledDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduledDate ? format(scheduledDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Schedule Time</h3>
                <Select value={scheduledTime} onValueChange={setScheduledTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateTimeOptions().map((time) => (
                      <SelectItem key={time} value={time}>
                        {format(
                          setMinutes(
                            setHours(new Date(), Number.parseInt(time.split(":")[0])),
                            Number.parseInt(time.split(":")[1]),
                          ),
                          "h:mm a",
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setActiveTab("upcoming")}>
                Cancel
              </Button>
              <Button onClick={handleSchedulePost} disabled={!postContent.trim() || !scheduledDate}>
                Schedule Post
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {scheduledPosts.length > 0 ? (
              scheduledPosts.map((post) => (
                <div key={post.id} className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        Scheduled for {format(post.scheduledFor, "PPP")} at {format(post.scheduledFor, "h:mm a")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                  <p>{post.content}</p>
                  {post.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.attachments.map((attachment, index) => (
                        <div key={index} className="rounded-md overflow-hidden w-20 h-20">
                          <img
                            src={attachment || "/placeholder.svg"}
                            alt="Attachment"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No scheduled posts</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Schedule posts to be published automatically at a later time
                </p>
                <Button className="mt-4" onClick={() => setActiveTab("create")}>
                  Create Scheduled Post
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            {publishedPosts.map((post) => (
              <div key={post.id} className="border rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Published on {format(post.publishedAt, "PPP")}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                      {post.stats.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      {post.stats.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                      {post.stats.shares}
                    </span>
                  </div>
                </div>
                <p>{post.content}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <SheetFooter className="mt-6">
          {activeTab === "upcoming" && (
            <Button onClick={() => setActiveTab("create")} className="w-full">
              Create New Scheduled Post
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
