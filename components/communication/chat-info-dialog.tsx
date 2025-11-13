"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BellOff, UserPlus, Trash2, LogOut, ImageIcon, File, Link } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface ChatInfoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chatData: {
    id: string
    name: string
    avatar?: string
    participants: { id: string; name: string; avatar?: string }[]
    isGroup: boolean
    messages: any[]
  }
}

export function ChatInfoDialog({ open, onOpenChange, chatData }: ChatInfoDialogProps) {
  // Get shared media from messages
  const sharedMedia = chatData.messages
    .filter((message) => message.attachments?.some((att: any) => att.type === "image"))
    .flatMap((message) =>
      message.attachments
        ?.filter((att: any) => att.type === "image")
        .map((att: any) => ({
          id: att.id,
          url: att.url,
          name: att.name,
          sender: message.senderName,
          timestamp: message.timestamp,
        })),
    )

  // Get shared files from messages
  const sharedFiles = chatData.messages
    .filter((message) => message.attachments?.some((att: any) => att.type === "file"))
    .flatMap((message) =>
      message.attachments
        ?.filter((att: any) => att.type === "file")
        .map((att: any) => ({
          id: att.id,
          url: att.url,
          name: att.name,
          size: att.size,
          sender: message.senderName,
          timestamp: message.timestamp,
        })),
    )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chat Information</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={chatData.avatar || "/placeholder.svg"} alt={chatData.name} />
            <AvatarFallback>{chatData.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{chatData.name}</h2>
          {chatData.isGroup ? (
            <p className="text-sm text-muted-foreground">{chatData.participants.length} participants</p>
          ) : (
            <p className="text-sm text-muted-foreground">Online</p>
          )}
        </div>

        <Tabs defaultValue="members">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="mt-4">
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {chatData.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                        <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        {participant.id === "current-user" && <p className="text-xs text-muted-foreground">You</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {chatData.isGroup && (
              <Button className="w-full mt-4">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Members
              </Button>
            )}
          </TabsContent>

          <TabsContent value="media" className="mt-4">
            <Tabs defaultValue="images">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="images">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Images
                </TabsTrigger>
                <TabsTrigger value="files">
                  <File className="h-4 w-4 mr-2" />
                  Files
                </TabsTrigger>
                <TabsTrigger value="links">
                  <Link className="h-4 w-4 mr-2" />
                  Links
                </TabsTrigger>
              </TabsList>

              <TabsContent value="images" className="mt-2">
                <ScrollArea className="h-[200px]">
                  {sharedMedia && sharedMedia.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {sharedMedia.map((media) => (
                        <div key={media.id} className="relative group cursor-pointer">
                          <img
                            src={media.url || "/placeholder.svg"}
                            alt={media.name}
                            className="w-full h-auto rounded-md aspect-square object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                            <Button variant="ghost" size="icon" className="text-white">
                              <ImageIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                      <p className="text-sm text-muted-foreground">No images shared yet</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="files" className="mt-2">
                <ScrollArea className="h-[200px]">
                  {sharedFiles && sharedFiles.length > 0 ? (
                    <div className="space-y-2">
                      {sharedFiles.map((file) => (
                        <div key={file.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
                          <File className="h-8 w-8 text-blue-500" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            {file.size && (
                              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                            )}
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[200px] text-center">
                      <File className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                      <p className="text-sm text-muted-foreground">No files shared yet</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="links" className="mt-2">
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <Link className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                  <p className="text-sm text-muted-foreground">No links shared yet</p>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="settings" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>

            <Separator />

            <div className="space-y-2">
              {chatData.isGroup ? (
                <>
                  <Button variant="outline" className="w-full justify-start">
                    <BellOff className="h-4 w-4 mr-2" />
                    Mute Notifications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <LogOut className="h-4 w-4 mr-2" />
                    Leave Group
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="w-full justify-start">
                  <BellOff className="h-4 w-4 mr-2" />
                  Mute Notifications
                </Button>
              )}
              <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Chat
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
