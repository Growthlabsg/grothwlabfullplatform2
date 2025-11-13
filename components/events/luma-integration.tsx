"use client"

import { useState, useEffect } from "react"
import { Calendar, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface LumaEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  price: string
  status: string
  attendees?: number
  category?: string
  featured?: boolean
}

interface LumaIntegrationProps {
  event: LumaEvent
  variant?: 'default' | 'compact' | 'card'
  showDetails?: boolean
  className?: string
}

export function LumaIntegration({ 
  event, 
  variant = 'default', 
  showDetails = true,
  className = ""
}: LumaIntegrationProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const handleLumaCheckout = () => {
    setIsLoading(true)
    
    // Simulate Luma checkout process
    setTimeout(() => {
      setIsLoading(false)
      setIsRegistered(true)
      toast({
        title: "Registration Successful",
        description: `You've successfully registered for ${event.title}`,
      })
    }, 2000)
  }

  const renderLumaButton = () => {
    const baseClasses = "luma-checkout--button transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
    
    const variantClasses = {
      default: "bg-[#0F7377] hover:bg-[#0F7377]/90 text-white px-6 py-3 rounded-lg font-medium",
      compact: "bg-[#0F7377] hover:bg-[#0F7377]/90 text-white px-4 py-2 rounded-md text-sm font-medium",
      card: "bg-[#0F7377] hover:bg-[#0F7377]/90 text-white px-4 py-2 rounded-lg font-medium w-full"
    }

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        type="button"
        data-luma-action="checkout"
        data-luma-event-id={event.id}
        onClick={handleLumaCheckout}
        disabled={isLoading || isRegistered}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Processing...
          </>
        ) : isRegistered ? (
          <>
            <CheckCircle className="h-4 w-4" />
            Registered
          </>
        ) : (
          <>
            <Calendar className="h-4 w-4" />
            Register for Event
          </>
        )}
      </button>
    )
  }

  const renderEventCard = () => {
    return (
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
        <div className="relative h-48 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          {event.featured && (
            <Badge className="absolute left-4 top-4 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white font-medium shadow-sm">
              Featured
            </Badge>
          )}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-lg font-bold mb-1 line-clamp-2">{event.title}</h3>
            <p className="text-blue-100 text-sm line-clamp-2">{event.description}</p>
          </div>
        </div>
        
        <CardContent className="p-4">
          {showDetails && (
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-[#0F7377]" />
                <span>{event.date} • {event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ExternalLink className="h-4 w-4 text-[#0F7377]" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
              {event.attendees && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-[#0F7377]" />
                  <span>{event.attendees}+ attendees</span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            {event.category && (
              <Badge variant="outline" className="text-xs">
                {event.category}
              </Badge>
            )}
            <Badge className={event.price === "Free" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
              {event.price}
            </Badge>
          </div>

          {/* Luma Registration Button */}
          <div className="mb-3">
            {renderLumaButton()}
          </div>

          {isRegistered && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>You're registered for this event</span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  const renderCompactView = () => {
    return (
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{event.title}</h3>
          <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
          <p className="text-sm text-gray-500">{event.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={event.price === "Free" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
            {event.price}
          </Badge>
          {renderLumaButton()}
        </div>
      </div>
    )
  }

  const renderDefaultView = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
          </div>
          {event.featured && (
            <Badge className="bg-[#F59E0B] text-white">
              Featured
            </Badge>
          )}
        </div>
        
        {showDetails && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#0F7377]" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#0F7377]" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-[#0F7377]" />
              <span>{event.location}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Badge className={event.price === "Free" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
            {event.price}
          </Badge>
          {renderLumaButton()}
        </div>
      </div>
    )
  }

  switch (variant) {
    case 'card':
      return renderEventCard()
    case 'compact':
      return renderCompactView()
    default:
      return renderDefaultView()
  }
}

// Luma Calendar Widget Component
export function LumaCalendarWidget() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleIframeError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#0F7377]" />
            Live Event Calendar
          </CardTitle>
          <CardDescription>
            Loading events from Luma...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[450px] items-center justify-center bg-slate-50 p-4">
            <div className="space-y-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F7377] mx-auto"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-60 mx-auto"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (hasError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Calendar Unavailable
          </CardTitle>
          <CardDescription>
            Unable to load the event calendar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[450px] flex-col items-center justify-center bg-slate-50 p-8 text-center">
            <Calendar className="mb-4 h-12 w-12 text-[#0F7377]" />
            <h3 className="mb-2 text-xl font-bold text-[#1E293B]">Calendar Temporarily Unavailable</h3>
            <p className="mb-4 text-[#334155]">
              We're experiencing issues loading our event calendar. Please check back soon or view our upcoming events
              below.
            </p>
            <a
              href="https://lu.ma/growthlab"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#0F7377] px-4 py-2 text-white hover:bg-[#0F7377]/90"
            >
              View on Lu.ma
            </a>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#0F7377]" />
          Live Event Calendar
        </CardTitle>
        <CardDescription>
          Powered by Luma - Discover and register for events
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <iframe
          src="https://lu.ma/embed/calendar/cal-KNN5iOtlTsVqaaf/events"
          width="100%"
          height="450"
          frameBorder="0"
          style={{
            border: "1px solid #bfcbda88",
            borderRadius: "4px",
          }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
          onError={handleIframeError}
          onLoad={() => setIsLoading(false)}
        ></iframe>
      </CardContent>
    </Card>
  )
}
