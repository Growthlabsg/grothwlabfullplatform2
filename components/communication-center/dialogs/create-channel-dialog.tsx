"use client"

import type React from "react"

import { useState } from "react"
import type { Section } from "@/types/communication"
import { useCommunication } from "@/contexts/communication-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Check, ChevronsUpDown, Hash, Users, Radio, MessageSquare, Lock } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

interface CreateChannelDialogProps {
  isOpen: boolean
  onClose: () => void
  activeSection: Section | null
}

export function CreateChannelDialog({ isOpen, onClose, activeSection }: CreateChannelDialogProps) {
  const { sections, createChannel } = useCommunication()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const [selectedSection, setSelectedSection] = useState<Section | null>(activeSection)
  const [members, setMembers] = useState<string[]>([])
  const [isCreating, setIsCreating] = useState(false)

  // Reset form when dialog opens/closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setName("")
      setDescription("")
      setIsPrivate(false)
      setMembers([])
      setIsCreating(false)
    }
    onClose()
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !selectedSection) return

    setIsCreating(true)

    try {
      await createChannel(name, description, selectedSection, isPrivate, members)

      handleOpenChange(false)
    } catch (error) {
      console.error("Failed to create channel:", error)
    } finally {
      setIsCreating(false)
    }
  }

  // Get icon for section type
  const getSectionIcon = (type: string) => {
    switch (type) {
      case "team":
        return <Hash className="h-4 w-4 mr-2" />
      case "direct":
        return <MessageSquare className="h-4 w-4 mr-2" />
      case "group":
        return <Users className="h-4 w-4 mr-2" />
      case "community":
        return <Users className="h-4 w-4 mr-2" />
      case "broadcast":
        return <Radio className="h-4 w-4 mr-2" />
      default:
        return <Hash className="h-4 w-4 mr-2" />
    }
  }

  // Filter sections that support channel creation
  const availableSections = sections.filter((section) =>
    ["team", "group", "community", "broadcast"].includes(section.type),
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create new channel</DialogTitle>
          <DialogDescription>
            Create a new channel for communication. Channels can be used for team discussions, groups, or broadcasts.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between">
                  {selectedSection ? (
                    <div className="flex items-center">
                      {getSectionIcon(selectedSection.type)}
                      {selectedSection.name}
                    </div>
                  ) : (
                    "Select section"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search sections..." />
                  <CommandList>
                    <CommandEmpty>No section found.</CommandEmpty>
                    <CommandGroup>
                      {availableSections.map((section) => (
                        <CommandItem
                          key={section.id}
                          onSelect={() => setSelectedSection(section)}
                          className="flex items-center"
                        >
                          <div className="flex items-center">
                            {getSectionIcon(section.type)}
                            {section.name}
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedSection?.id === section.id ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Channel name</Label>
            <div className="flex">
              {selectedSection?.type === "team" && (
                <div className="flex items-center bg-muted px-3 rounded-l-md border-y border-l border-input">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. marketing, project-alpha"
                className={selectedSection?.type === "team" ? "rounded-l-none" : ""}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this channel about?"
              className="resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="private">Private channel</Label>
              <p className="text-sm text-muted-foreground">Only invited people can join</p>
            </div>
            <Switch id="private" checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>

          {isPrivate && (
            <div className="flex items-center text-sm text-muted-foreground border rounded-md p-3">
              <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
              <p>Private channels are only visible to its members. This cannot be changed later.</p>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim() || !selectedSection || isCreating}>
              {isCreating ? "Creating..." : "Create channel"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
