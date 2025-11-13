import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Users, ExternalLink, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "GrowthLab Demo Day | GrowthLab.sg",
  description:
    "Join GrowthLab's Demo Day to see pitches from our latest cohort of startups and connect with investors.",
}

export default function DemoDayPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#0F7377] py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/abstract-pattern.jpg"
            alt="Abstract pattern"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <Badge className="mb-4 w-fit bg-white/20 text-white hover:bg-white/30">July 15, 2025</Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                GrowthLab Demo Day: Cohort 5
              </h1>
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                Join us for an exciting showcase of Southeast Asia's most promising startups. Connect with founders,
                investors, and industry leaders.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                  <Link href="#register">Register Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="#startups">View Startups</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-full max-w-md overflow-hidden rounded-lg md:h-[400px]">
                <Image
                  src="/placeholder.svg?height=800&width=600&query=startup pitch event on stage"
                  alt="Demo Day Event"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Event Details</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Everything you need to know about GrowthLab's Demo Day
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>When</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#0F7377]/10 p-3">
                      <Calendar className="h-6 w-6 text-[#0F7377]" />
                    </div>
                    <div>
                      <p className="font-medium">July 15, 2025</p>
                      <p className="text-sm text-muted-foreground">Tuesday</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#0F7377]/10 p-3">
                      <Clock className="h-6 w-6 text-[#0F7377]" />
                    </div>
                    <div>
                      <p className="font-medium">2:00 PM - 6:00 PM</p>
                      <p className="text-sm text-muted-foreground">Singapore Time (GMT+8)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Where</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#0F7377]/10 p-3">
                      <MapPin className="h-6 w-6 text-[#0F7377]" />
                    </div>
                    <div>
                      <p className="font-medium">Marina Bay Sands</p>
                      <p className="text-sm text-muted-foreground">10 Bayfront Avenue, Singapore 018956</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="https://maps.google.com" target="_blank">
                        View Map
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Who</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-[#0F7377]/10 p-3">
                      <Users className="h-6 w-6 text-[#0F7377]" />
                    </div>
                    <div>
                      <p className="font-medium">200+ Attendees</p>
                      <p className="text-sm text-muted-foreground">Investors, Founders, and Industry Leaders</p>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Avatar key={i} className="border-2 border-background">
                        <AvatarImage src={`/thoughtful-artist.png?height=40&width=40&query=person ${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                      +195
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Startups Section */}
      <section id="startups" className="bg-[#F8FAFC] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Featured Startups</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Meet the innovative startups from our Cohort 5 who will be pitching at Demo Day
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&query=startup product ${i}`}
                    alt={`Startup ${i}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <Badge className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                      {i % 3 === 0 ? "Fintech" : i % 3 === 1 ? "Healthtech" : "SaaS"}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Startup Name {i}</CardTitle>
                  <CardDescription>
                    {i % 3 === 0
                      ? "Revolutionizing payments for SMEs"
                      : i % 3 === 1
                        ? "AI-powered health diagnostics"
                        : "Enterprise collaboration platform"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {i % 3 === 0
                      ? "A fintech solution that simplifies cross-border payments for small businesses in Southeast Asia."
                      : i % 3 === 1
                        ? "Using AI to provide affordable health diagnostics for underserved communities."
                        : "Helping remote teams collaborate more effectively with smart workflows and integrations."}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/startups/startup-${i}`}>
                      View Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Event Agenda</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">Schedule for the GrowthLab Demo Day</p>
          </div>

          <div className="mx-auto max-w-3xl space-y-8">
            <div className="relative border-l border-[#0F7377] pl-6">
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-[#0F7377]" />
              <div className="mb-1 text-sm font-medium text-muted-foreground">2:00 PM - 2:30 PM</div>
              <h3 className="mb-1 text-lg font-medium">Registration & Networking</h3>
              <p className="text-muted-foreground">
                Arrive early to register, grab refreshments, and network with other attendees.
              </p>
            </div>

            <div className="relative border-l border-[#0F7377] pl-6">
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-[#0F7377]" />
              <div className="mb-1 text-sm font-medium text-muted-foreground">2:30 PM - 3:00 PM</div>
              <h3 className="mb-1 text-lg font-medium">Welcome & Opening Remarks</h3>
              <p className="text-muted-foreground">Opening address by GrowthLab's CEO and special guest speakers.</p>
            </div>

            <div className="relative border-l border-[#0F7377] pl-6">
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-[#0F7377]" />
              <div className="mb-1 text-sm font-medium text-muted-foreground">3:00 PM - 4:30 PM</div>
              <h3 className="mb-1 text-lg font-medium">Startup Pitches</h3>
              <p className="text-muted-foreground">
                10 startups will pitch their solutions (5 minutes each) followed by Q&A (3 minutes each).
              </p>
            </div>

            <div className="relative border-l border-[#0F7377] pl-6">
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-[#0F7377]" />
              <div className="mb-1 text-sm font-medium text-muted-foreground">4:30 PM - 5:00 PM</div>
              <h3 className="mb-1 text-lg font-medium">Keynote Speaker</h3>
              <p className="text-muted-foreground">Special keynote address by a prominent industry leader.</p>
            </div>

            <div className="relative border-l border-[#0F7377] pl-6">
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-[#0F7377]" />
              <div className="mb-1 text-sm font-medium text-muted-foreground">5:00 PM - 6:00 PM</div>
              <h3 className="mb-1 text-lg font-medium">Networking Reception</h3>
              <p className="text-muted-foreground">
                Connect with startups, investors, and industry leaders over drinks and canapés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="bg-[#0F7377] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Register for Demo Day</h2>
            <p className="mb-8 text-lg text-white/90">
              Secure your spot at GrowthLab's Demo Day to see the most promising startups in Southeast Asia.
            </p>
            <Card>
              <CardHeader>
                <CardTitle>Registration Form</CardTitle>
                <CardDescription>Fill out the form below to register for the event</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        id="name"
                        className="w-full rounded-md border border-gray-300 p-2"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-md border border-gray-300 p-2"
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company
                      </label>
                      <input
                        id="company"
                        className="w-full rounded-md border border-gray-300 p-2"
                        placeholder="Your company name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium">
                        Role
                      </label>
                      <select id="role" className="w-full rounded-md border border-gray-300 p-2" required>
                        <option value="">Select your role</option>
                        <option value="investor">Investor</option>
                        <option value="founder">Founder</option>
                        <option value="corporate">Corporate</option>
                        <option value="media">Media</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="interests" className="text-sm font-medium">
                      Interests
                    </label>
                    <textarea
                      id="interests"
                      className="h-24 w-full rounded-md border border-gray-300 p-2"
                      placeholder="What are you most interested in seeing at Demo Day?"
                    ></textarea>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="updates" className="rounded border-gray-300" />
                    <label htmlFor="updates" className="text-sm">
                      I would like to receive updates about future GrowthLab events
                    </label>
                  </div>
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Register Now</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Our Sponsors</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Thank you to our sponsors for making Demo Day possible
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="flex flex-col items-center justify-center p-6">
                <div className="relative mb-4 h-16 w-full">
                  <Image
                    src={`/placeholder.svg?height=64&width=200&query=company logo ${i}`}
                    alt={`Sponsor ${i}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="mb-2 text-center text-lg font-medium">Sponsor Name {i}</h3>
                <p className="text-center text-sm text-muted-foreground">
                  {i === 1
                    ? "Platinum Sponsor"
                    : i === 2
                      ? "Gold Sponsor"
                      : i === 3
                        ? "Silver Sponsor"
                        : "Bronze Sponsor"}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">Find answers to common questions about Demo Day</p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {[
              {
                q: "Is there a cost to attend Demo Day?",
                a: "No, attendance is free but registration is required as space is limited.",
              },
              {
                q: "Can I meet with the startups individually?",
                a: "Yes, there will be a networking session after the pitches where you can connect with the founders.",
              },
              {
                q: "Will the pitches be recorded?",
                a: "Yes, recordings will be available to registered attendees after the event.",
              },
              {
                q: "What is the dress code?",
                a: "Business casual is recommended for all attendees.",
              },
              {
                q: "Is there parking available at the venue?",
                a: "Yes, Marina Bay Sands has paid parking available for all attendees.",
              },
            ].map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0F7377] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Join Us at Demo Day</h2>
            <p className="mb-8 text-lg text-white/90">
              Don't miss this opportunity to see the most promising startups in Southeast Asia and connect with the
              ecosystem.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                <Link href="#register">Register Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
