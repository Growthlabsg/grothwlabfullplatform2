"use client"

import { useState } from "react"
import { Filter, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"

interface NotificationFiltersProps {
  onFiltersChange: (filters: string[]) => void
}

export function NotificationFilters({ onFiltersChange }: NotificationFiltersProps) {
  const [open, setOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filterOptions = [
    { value: "messages", label: "Messages" },
    { value: "calls", label: "Calls" },
    { value: "meetings", label: "Meetings" },
    { value: "files", label: "Files" },
    { value: "groups", label: "Groups" },
    { value: "mentions", label: "Mentions" },
    { value: "unread", label: "Unread" },
    { value: "favorites", label: "Favorites" },
  ]

  const toggleFilter = (value: string) => {
    const newFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((filter) => filter !== value)
      : [...selectedFilters, value]

    setSelectedFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    setSelectedFilters([])
    onFiltersChange([])
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
            {selectedFilters.length > 0 && (
              <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                {selectedFilters.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search filters..." />
            <CommandList>
              <CommandEmpty>No filters found.</CommandEmpty>
              <CommandGroup>
                {filterOptions.map((option) => {
                  const isSelected = selectedFilters.includes(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleFilter(option.value)}
                      className="flex items-center justify-between"
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check className="h-4 w-4" />}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedFilters.map((filter) => {
            const option = filterOptions.find((opt) => opt.value === filter)
            return (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1 h-6">
                {option?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => toggleFilter(filter)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {option?.label} filter</span>
                </Button>
              </Badge>
            )
          })}

          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
