import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Users, MapPin, ArrowRight, MessageSquare, ThumbsUp, Share2 } from "lucide-react"

export const metadata: Metadata = {
  title: "GrowthLab Community | GrowthLab.sg",
  description: "Join the GrowthLab community to connect with founders, investors, and mentors in Southeast Asia.",
}

export default function CommunityPage() {
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
              <Badge className="mb-4 w-fit bg-white/20 text-white hover:bg-white/30">Join Our Community</Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Connect with Southeast Asia's Startup Ecosystem
              </h1>
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                Join a vibrant community of founders, investors, mentors, and ecosystem builders. Share knowledge, find
                resources, and build meaningful connections.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                  <Link href="/signup">Join Community</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="#events">Upcoming Events</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-full max-w-md overflow-hidden rounded-lg md:h-[400px]">
                <Image src="/professional-connections.png" alt="Community networking" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Features Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Community Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Everything you need to connect, learn, and grow in the startup ecosystem
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Connect</CardTitle>
                <CardDescription>Build your network</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-[#0F7377] p-1 text-white">
                      <Users className="h-3 w-3" />
                    </div>
                    <span>Find co-founders, investors, and mentors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-[#0F7377] p-1 text-white">
                      <MessageSquare className="h-3 w-3" />
                    </div>
                    <span>Direct messaging and group chats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-[#0F7377] p-1 text-white">
                      <Calendar className="h-3 w-3" />
                    </div>
                    <span>Networking events and meetups</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/chat">Start Connecting</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learn</CardTitle>
                <CardDescription>Grow your knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-[#0F7377] p-1 text-white">
                      <Users className="h-3 w-3" />
                    </div>
                    <span>Expert-led workshops and webinars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-[#0F7377] p-1 text-white">
                      <MessageSquare className="h-3 w-3" />
                    </div>
                    <span>Resource library and startup guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-[#0F7377] p-1 text-white">
                      <Calendar className="h-3 w-3" />
                    </div>
                    <span>Founder stories and case studies</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/resources">Access Resources</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collaborate</CardTitle>
                <CardDescription>Work together</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-[#0F7377] p-1 text-white">
                      <Users className="h-3 w-3" />
                    </div>
                    <span>Find partners and service providers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-[#0F7377] p-1 text-white">
                      <MessageSquare className="h-3 w-3" />
                    </div>
                    <span>Project collaboration spaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-[#0F7377] p-1 text-white">
                      <Calendar className="h-3 w-3" />
                    </div>
                    <span>Hackathons and innovation challenges</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/collaborate">Start Collaborating</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Feed Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Community Feed</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Stay updated with the latest discussions, announcements, and opportunities
            </p>
          </div>

          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="mx-auto flex w-full max-w-md justify-between">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/thoughtful-artist.png?height=40&width=40&query=person ${i}`} />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">User Name {i}</p>
                          <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                        </div>
                      </div>
                      <Badge variant="outline">Announcement</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-medium">Exciting news about our upcoming Demo Day!</h3>
                    <p className="mb-4 text-muted-foreground">
                      We're thrilled to announce our upcoming Demo Day on July 15th. Join us to see pitches from our
                      latest cohort of startups and connect with investors and founders.
                    </p>
                    <div className="mb-4 rounded-md border p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="font-medium">Demo Day - Cohort 5</p>
                          <p className="text-sm text-muted-foreground">July 15, 2025 • 2:00 PM - 5:00 PM</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-[#0F7377]" />
                        <p className="text-sm text-muted-foreground">Marina Bay Sands, Singapore</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button type="button" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          <span>42 Likes</span>
                        </button>
                        <button type="button" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span>12 Comments</span>
                        </button>
                      </div>
                      <button type="button" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="text-center">
                <Button variant="outline">Load More</Button>
              </div>
            </TabsContent>

            <TabsContent value="announcements" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/diverse-office-admin.png" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">GrowthLab Admin</p>
                        <p className="text-xs text-muted-foreground">Posted 1 day ago</p>
                      </div>
                    </div>
                    <Badge variant="outline">Announcement</Badge>
                  </div>
                  <h3 className="mb-2 text-lg font-medium">New Partnership with Google for Startups</h3>
                  <p className="mb-4 text-muted-foreground">
                    We're excited to announce our new partnership with Google for Startups. This collaboration will
                    provide our community members with access to Google Cloud credits, technical mentorship, and more.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button type="button" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>78 Likes</span>
                      </button>
                      <button type="button" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span>23 Comments</span>
                      </button>
                    </div>
                    <button type="button" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="events" className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Upcoming Events</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Join our community events to learn, network, and grow
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/vibrant-startup-gathering.png?height=300&width=500&query=startup event ${i}`}
                    alt={`Event ${i}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <Badge className="bg-[#F59E0B] hover:bg-[#F59E0B]/90">
                      {i === 1 ? "Workshop" : i === 2 ? "Networking" : "Pitch Night"}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>
                    {i === 1
                      ? "Fundraising Masterclass"
                      : i === 2
                        ? "Founder Mixer"
                        : "Pitch Perfect: Investor Edition"}
                  </CardTitle>
                  <CardDescription>
                    {i === 1
                      ? "Learn how to raise your next round"
                      : i === 2
                        ? "Connect with other founders"
                        : "Practice your pitch with real investors"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {i === 1 ? "June 15, 2025" : i === 2 ? "June 22, 2025" : "June 29, 2025"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {i === 1 ? "GrowthLab HQ, Singapore" : i === 2 ? "The Working Capitol" : "Online"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{30 + i * 10} attendees</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Register Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Leaders Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Community Leaders</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Meet the experts and mentors who contribute to our community
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="mb-4 h-24 w-24">
                      <AvatarImage
                        src={`/confident-professional.png?height=96&width=96&query=professional person ${i}`}
                      />
                      <AvatarFallback>L{i}</AvatarFallback>
                    </Avatar>
                    <h3 className="mb-1 text-lg font-medium">Leader Name {i}</h3>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {i === 1
                        ? "Startup Mentor"
                        : i === 2
                          ? "Angel Investor"
                          : i === 3
                            ? "VC Partner"
                            : "Community Manager"}
                    </p>
                    <p className="mb-4 text-center text-sm text-muted-foreground">
                      {i === 1
                        ? "Helped 50+ startups scale their operations"
                        : i === 2
                          ? "Invested in 20+ early-stage startups"
                          : i === 3
                            ? "Led investments in fintech and healthtech"
                            : "Building communities for 5+ years"}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/profile/leader-${i}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/community/leaders">
                View All Leaders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Join CTA Section */}
      <section className="bg-[#0F7377] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Join Our Community Today</h2>
            <p className="mb-8 text-lg text-white/90">
              Connect with founders, investors, and mentors. Access resources, events, and opportunities to help your
              startup grow.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                <Link href="/signup">Join Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
