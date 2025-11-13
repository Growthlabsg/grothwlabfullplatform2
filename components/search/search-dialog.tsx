"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Calendar, FileText, Rocket, Users, DollarSign, GraduationCap, Lightbulb } from "lucide-react"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")

  // Define search categories and items
  const searchCategories = [
    {
      name: "Programs",
      items: [
        { name: "Accelerator Program", href: "/accelerator/apply", icon: <Rocket className="mr-2 h-4 w-4" /> },
        { name: "Co-Founder Matching", href: "/co-founder-matching", icon: <Users className="mr-2 h-4 w-4" /> },
        { name: "Funding Marketplace", href: "/funding", icon: <DollarSign className="mr-2 h-4 w-4" /> },
        { name: "Startup School", href: "/startup-school", icon: <GraduationCap className="mr-2 h-4 w-4" /> },
      ],
    },
    {
      name: "Events",
      items: [
        { name: "Upcoming Events", href: "/events", icon: <Calendar className="mr-2 h-4 w-4" /> },
        { name: "Demo Day", href: "/demo-day", icon: <Calendar className="mr-2 h-4 w-4" /> },
        { name: "Workshops", href: "/events?type=workshop", icon: <Calendar className="mr-2 h-4 w-4" /> },
      ],
    },
    {
      name: "Resources",
      items: [
        { name: "Startup Resources", href: "/resources", icon: <FileText className="mr-2 h-4 w-4" /> },
        { name: "Mentor Connect", href: "/mentorship", icon: <Lightbulb className="mr-2 h-4 w-4" /> },
        { name: "Community", href: "/community", icon: <Users className="mr-2 h-4 w-4" /> },
      ],
    },
  ]

  // Filter items based on search query
  const filteredCategories = query
    ? searchCategories
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
        }))
        .filter((category) => category.items.length > 0)
    : searchCategories

  // Handle item selection
  const handleSelect = (href: string) => {
    router.push(href)
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search across GrowthLab..." value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {filteredCategories.map((category) => (
          <CommandGroup key={category.name} heading={category.name}>
            {category.items.map((item) => (
              <CommandItem key={item.href} onSelect={() => handleSelect(item.href)}>
                {item.icon}
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
