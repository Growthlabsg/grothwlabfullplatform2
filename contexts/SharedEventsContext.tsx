"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface SharedEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  price: string
  attendees: string
  featured: boolean
  image?: string
  organizer: {
    id: string
    name: string
    avatar?: string
  }
  // Sports-specific fields
  sport?: string
  duration?: string
  capacity?: number
  registered?: number
  teamsAllowed?: boolean
  networking?: {
    enabled: boolean
    theme?: string
    time?: string
  }
  // Event type to distinguish between regular and sports events
  eventType: 'regular' | 'sports'
  // Additional fields for compatibility
  lumaEventId?: string
  status?: string
  tags?: string[]
  virtual?: boolean
  language?: string
  difficulty?: string
  requirements?: string
}

interface SharedEventsContextType {
  events: SharedEvent[]
  sportsEvents: SharedEvent[]
  regularEvents: SharedEvent[]
  addEvent: (event: SharedEvent) => void
  updateEvent: (id: string, event: Partial<SharedEvent>) => void
  deleteEvent: (id: string) => void
  getEventById: (id: string) => SharedEvent | undefined
  getEventsByCategory: (category: string) => SharedEvent[]
  getSportsEvents: () => SharedEvent[]
  getRegularEvents: () => SharedEvent[]
  getAllEvents: () => SharedEvent[]
}

const SharedEventsContext = createContext<SharedEventsContextType | undefined>(undefined)

export function SharedEventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<SharedEvent[]>([])
  const [sportsEvents, setSportsEvents] = useState<SharedEvent[]>([])
  const [regularEvents, setRegularEvents] = useState<SharedEvent[]>([])

  // Load events from localStorage on mount
  useEffect(() => {
    const loadEvents = () => {
      try {
        const storedEvents = localStorage.getItem('sharedEvents')
        const storedSportsEvents = localStorage.getItem('sportsEvents')
        const storedRegularEvents = localStorage.getItem('regularEvents')
        
        if (storedEvents) {
          const parsedEvents = JSON.parse(storedEvents)
          setEvents(parsedEvents)
        }
        
        if (storedSportsEvents) {
          const parsedSportsEvents = JSON.parse(storedSportsEvents)
          setSportsEvents(parsedSportsEvents)
        }
        
        if (storedRegularEvents) {
          const parsedRegularEvents = JSON.parse(storedRegularEvents)
          setRegularEvents(parsedRegularEvents)
        }
      } catch (error) {
        console.error('Error loading events from localStorage:', error)
      }
    }

    loadEvents()
  }, [])

  // Save events to localStorage whenever events change
  useEffect(() => {
    try {
      localStorage.setItem('sharedEvents', JSON.stringify(events))
      localStorage.setItem('sportsEvents', JSON.stringify(sportsEvents))
      localStorage.setItem('regularEvents', JSON.stringify(regularEvents))
    } catch (error) {
      console.error('Error saving events to localStorage:', error)
    }
  }, [events, sportsEvents, regularEvents])

  const addEvent = (event: SharedEvent) => {
    setEvents(prev => [...prev, event])
    
    if (event.eventType === 'sports') {
      setSportsEvents(prev => [...prev, event])
    } else {
      setRegularEvents(prev => [...prev, event])
    }
  }

  const updateEvent = (id: string, updatedEvent: Partial<SharedEvent>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    )
    
    setSportsEvents(prev => 
      prev.map(event => 
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    )
    
    setRegularEvents(prev => 
      prev.map(event => 
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    )
  }

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id))
    setSportsEvents(prev => prev.filter(event => event.id !== id))
    setRegularEvents(prev => prev.filter(event => event.id !== id))
  }

  const getEventById = (id: string) => {
    return events.find(event => event.id === id)
  }

  const getEventsByCategory = (category: string) => {
    return events.filter(event => event.category === category)
  }

  const getSportsEvents = () => {
    return sportsEvents
  }

  const getRegularEvents = () => {
    return regularEvents
  }

  const getAllEvents = () => {
    return events
  }

  const value: SharedEventsContextType = {
    events,
    sportsEvents,
    regularEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventsByCategory,
    getSportsEvents,
    getRegularEvents,
    getAllEvents
  }

  return (
    <SharedEventsContext.Provider value={value}>
      {children}
    </SharedEventsContext.Provider>
  )
}

export function useSharedEvents() {
  const context = useContext(SharedEventsContext)
  if (context === undefined) {
    throw new Error('useSharedEvents must be used within a SharedEventsProvider')
  }
  return context
}
