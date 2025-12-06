"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  category: string;
  featured: boolean;
  image: string;
  price: string;
  status: string;
  lumaEventId: string;
}

interface EventsContextType {
  events: Event[];
  savedEvents: number[];
  addEvent: (event: Event) => void;
  updateEvent: (id: number, event: Partial<Event>) => void;
  deleteEvent: (id: number) => void;
  saveEvent: (eventId: number) => void;
  unsaveEvent: (eventId: number) => void;
  getEventsByCategory: (category: string) => Event[];
  getFeaturedEvents: () => Event[];
  getUpcomingEvents: () => Event[];
  searchEvents: (query: string) => Event[];
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

  // Initialize with default events on mount
  useEffect(() => {
    // Default events with Luma integration
    const defaultEvents: Event[] = [
      {
        id: 1,
        title: "GrowthLab Demo Day: Cohort 4",
        description:
          "Join us for an exciting showcase of innovative startups from our latest accelerator cohort.",
        date: "April 28, 2025",
        time: "6:00 PM - 9:00 PM SGT",
        location: "BASH, 79 Ayer Rajah Crescent, Singapore",
        attendees: "250+ Attendees Expected",
        category: "Demo Day",
        featured: true,
        image: "/startup-demo-day.png",
        price: "Free",
        status: "Open for RSVP",
        lumaEventId: "evt-demo-day-cohort-4",
      },
      {
        id: 2,
        title: "Founder Networking Mixer",
        description:
          "Connect with fellow entrepreneurs and investors in a relaxed networking environment.",
        date: "May 5, 2025",
        time: "7:00 PM - 9:00 PM",
        location: "GrowthLab HQ, Singapore",
        attendees: "100+ Attendees Expected",
        category: "Networking",
        featured: false,
        image: "/networking-event.png",
        price: "Free",
        status: "Open for RSVP",
        lumaEventId: "evt-founder-networking-mixer",
      },
      {
        id: 3,
        title: "AI for Startups Workshop",
        description:
          "Learn how to integrate AI into your startup and gain a competitive advantage.",
        date: "May 12, 2025",
        time: "2:00 PM - 5:00 PM",
        location: "Online",
        attendees: "50+ Attendees Expected",
        category: "Workshop",
        featured: false,
        image: "/ai-workshop.png",
        price: "SGD 50",
        status: "Open for Registration",
        lumaEventId: "evt-ai-workshop-startups",
      },
      {
        id: 4,
        title: "Pitch Night: FinTech Edition",
        description:
          "Watch innovative fintech startups pitch their ideas to a panel of investors.",
        date: "May 19, 2025",
        time: "6:30 PM - 9:30 PM",
        location: "Marina Bay Sands, Singapore",
        attendees: "200+ Attendees Expected",
        category: "Pitch Night",
        featured: true,
        image: "/pitch-night.png",
        price: "Free",
        status: "Open for RSVP",
        lumaEventId: "evt-pitch-night-fintech",
      },
      {
        id: 5,
        title: "Fundraising Masterclass",
        description:
          "Learn the ins and outs of startup fundraising from successful entrepreneurs and VCs.",
        date: "May 26, 2025",
        time: "10:00 AM - 12:00 PM",
        location: "GrowthLab HQ, Singapore",
        attendees: "30+ Attendees Expected",
        category: "Workshop",
        featured: false,
        image: "/fundraising-masterclass.png",
        price: "SGD 100",
        status: "Open for Registration",
        lumaEventId: "evt-fundraising-masterclass",
      },
      {
        id: 6,
        title: "Startup Hackathon 2025",
        description:
          "48-hour hackathon to build innovative solutions for real-world problems.",
        date: "June 1-2, 2025",
        time: "9:00 AM - 9:00 PM",
        location: "Singapore University of Technology and Design",
        attendees: "500+ Attendees Expected",
        category: "Hackathon",
        featured: true,
        image: "/hackathon.png",
        price: "Free",
        status: "Open for Registration",
        lumaEventId: "evt-startup-hackathon-2025",
      },
    ];
    setEvents(defaultEvents);
  }, []);

  const addEvent = (event: Event) => {
    const newEvent = { ...event, id: Date.now() };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: number, updatedEvent: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    );
  };

  const deleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const saveEvent = (eventId: number) => {
    setSavedEvents((prev) => [...prev, eventId]);
  };

  const unsaveEvent = (eventId: number) => {
    setSavedEvents((prev) => prev.filter((id) => id !== eventId));
  };

  const getEventsByCategory = (category: string) => {
    if (category === "all") return events;
    return events.filter(
      (event) => event.category.toLowerCase() === category.toLowerCase()
    );
  };

  const getFeaturedEvents = () => {
    return events.filter((event) => event.featured);
  };

  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split("T")[0];
    return events.filter((event) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      return eventDate >= today;
    });
  };

  const searchEvents = (query: string) => {
    if (!query) return events;
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.category.toLowerCase().includes(query.toLowerCase())
    );
  };

  const value: EventsContextType = {
    events,
    savedEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    saveEvent,
    unsaveEvent,
    getEventsByCategory,
    getFeaturedEvents,
    getUpcomingEvents,
    searchEvents,
  };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
