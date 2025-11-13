import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, Users, DollarSign, Clock, ArrowRight } from "lucide-react"

export default function ProgramsPage() {
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
              <Badge className="mb-4 w-fit bg-white/20 text-white hover:bg-white/30">
                Applications Open for Cohort 5
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">GrowthLab Programs</h1>
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                Join our world-class programs designed to help startups at every stage of their journey. From idea
                validation to scaling globally, we provide the funding, mentorship, and resources you need to succeed.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                  <Link href="/accelerator/apply">Apply Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="#programs">Explore Programs</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-full max-w-md overflow-hidden rounded-lg md:h-[400px]">
                <Image src="/collaborative-innovation.png" alt="Startup team" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Our Programs</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              GrowthLab offers a range of programs to support startups at every stage of their journey.
            </p>
          </div>

          <Tabs defaultValue="accelerator" className="space-y-8">
            <TabsList className="mx-auto flex w-full max-w-md justify-between">
              <TabsTrigger value="accelerator">Accelerator</TabsTrigger>
              <TabsTrigger value="incubator">Incubator</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="accelerator" className="space-y-8">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image src="/rising-tide-startups.png" alt="Accelerator Program" fill className="object-cover" />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <Badge className="mb-2 bg-[#0F7377] hover:bg-[#0F7377]/90">Flagship Program</Badge>
                      <h3 className="mb-2 text-2xl font-bold">GrowthLab Accelerator</h3>
                      <p className="text-muted-foreground">
                        A 3-month intensive program with SGD 500K funding, mentorship, and resources to scale your
                        startup.
                      </p>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">3 months</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="text-sm font-medium">Batch Size</p>
                          <p className="text-sm text-muted-foreground">10-15 startups</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="text-sm font-medium">Funding</p>
                          <p className="text-sm text-muted-foreground">SGD 500K</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="text-sm font-medium">Next Cohort</p>
                          <p className="text-sm text-muted-foreground">July 2025</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-2 font-medium">What You Get</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span className="text-sm">SGD 500K investment for 7.5% equity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span className="text-sm">Access to 100+ mentors and investors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span className="text-sm">Co-working space in Singapore</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span className="text-sm">Demo Day with 200+ investors</span>
                        </li>
                      </ul>
                    </div>

                    <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                      <Link href="/accelerator/apply">Apply Now</Link>
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="grid gap-8 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Program Structure</CardTitle>
                    <CardDescription>How the 3-month program is organized</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F7377] text-xs font-medium text-white">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Month 1: Foundation</p>
                          <p className="text-sm text-muted-foreground">
                            Product refinement, market validation, and business model development
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F7377] text-xs font-medium text-white">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Month 2: Growth</p>
                          <p className="text-sm text-muted-foreground">
                            Customer acquisition, scaling strategies, and operational excellence
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F7377] text-xs font-medium text-white">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Month 3: Fundraising</p>
                          <p className="text-sm text-muted-foreground">
                            Pitch preparation, investor connections, and Demo Day
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Eligibility Criteria</CardTitle>
                    <CardDescription>What we look for in startups</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <span className="text-sm">Tech-enabled solution with scalable business model</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <span className="text-sm">MVP with some traction or early customers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <span className="text-sm">Full-time founding team with complementary skills</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <span className="text-sm">Addressing a large market opportunity (&gt;$1B)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <span className="text-sm">Willingness to relocate to Singapore for the program</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                        <span className="text-sm">Strong growth potential in Southeast Asia</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Process</CardTitle>
                    <CardDescription>Steps to join the program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F7377] text-xs font-medium text-white">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Online Application</p>
                          <p className="text-sm text-muted-foreground">
                            Submit your application with company details and pitch deck
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F7377] text-xs font-medium text-white">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Initial Screening</p>
                          <p className="text-sm text-muted-foreground">Review by our investment committee</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F7377] text-xs font-medium text-white">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Interview</p>
                          <p className="text-sm text-muted-foreground">Virtual meeting with the GrowthLab team</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F7377] text-xs font-medium text-white">
                          4
                        </div>
                        <div>
                          <p className="font-medium">Final Selection</p>
                          <p className="text-sm text-muted-foreground">Due diligence and offer</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="incubator" className="space-y-8">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image src="/budding-ideas.png" alt="Incubator Program" fill className="object-cover" />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <Badge className="mb-2 bg-[#0F7377] hover:bg-[#0F7377]/90">Early Stage</Badge>
                      <h3 className="mb-2 text-2xl font-bold">GrowthLab Incubator</h3>
                      <p className="text-muted-foreground">
                        A 6-month program for early-stage startups to validate their ideas and build their MVP.
                      </p>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">6 months</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="text-sm font-medium">Batch Size</p>
                          <p className="text-sm text-muted-foreground">20-25 startups</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="text-sm font-medium">Funding</p>
                          <p className="text-sm text-muted-foreground">SGD 50K</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="text-sm font-medium">Next Cohort</p>
                          <p className="text-sm text-muted-foreground">September 2025</p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                      <Link href="/incubator/apply">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="corporate" className="space-y-8">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src="/converging-ideas.png"
                      alt="Corporate Innovation Program"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <Badge className="mb-2 bg-[#0F7377] hover:bg-[#0F7377]/90">Corporate</Badge>
                      <h3 className="mb-2 text-2xl font-bold">Corporate Innovation Program</h3>
                      <p className="text-muted-foreground">
                        A customized program for corporations to collaborate with startups and drive innovation.
                      </p>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-sm text-muted-foreground">Customized</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-[#0F7377]" />
                        <div>
                          <p className="text-sm font-medium">Partners</p>
                          <p className="text-sm text-muted-foreground">5-10 corporations</p>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                      <Link href="/corporate/innovation">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="space-y-8">
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src="/placeholder.svg?height=800&width=600&query=startup community events"
                      alt="Community Programs"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <Badge className="mb-2 bg-[#0F7377] hover:bg-[#0F7377]/90">Community</Badge>
                      <h3 className="mb-2 text-2xl font-bold">GrowthLab Community</h3>
                      <p className="text-muted-foreground">
                        Free events, workshops, and resources for the startup ecosystem in Singapore and Southeast Asia.
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-2 font-medium">What's Included</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span className="text-sm">Monthly networking events</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span className="text-sm">Workshops and masterclasses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span className="text-sm">Online resources and guides</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span className="text-sm">Community forum and discussion groups</span>
                        </li>
                      </ul>
                    </div>

                    <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                      <Link href="/community">Join Community</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Success Stories</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Meet the startups that have gone through our programs and achieved remarkable success.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&query=startup team ${i}`}
                    alt={`Success Story ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Success Story {i}</CardTitle>
                  <CardDescription>GrowthLab Accelerator Cohort {i}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/success-stories/${i}`}>
                      Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/success-stories">View All Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Find answers to common questions about our programs.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {[
              {
                q: "What is the investment structure for the Accelerator program?",
                a: "We invest SGD 500K for 7.5% equity in your startup. The investment is made via a SAFE note with a valuation cap.",
              },
              {
                q: "Do I need to relocate to Singapore for the program?",
                a: "Yes, at least one founder needs to be physically present in Singapore for the duration of the program. We provide co-working space and support with visa arrangements.",
              },
              {
                q: "What happens after the program ends?",
                a: "After the program, you become part of our alumni network with ongoing support, including follow-on funding opportunities, connections to our investor network, and access to exclusive events.",
              },
              {
                q: "How selective is the program?",
                a: "We typically receive 500+ applications per cohort and select 10-15 startups, making our acceptance rate around 2-3%.",
              },
              {
                q: "What industries do you focus on?",
                a: "We are industry-agnostic but have a preference for tech-enabled solutions in fintech, healthtech, edtech, enterprise SaaS, AI/ML, and sustainability.",
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

          <div className="mt-8 text-center">
            <p className="mb-4 text-muted-foreground">Still have questions? Contact us for more information.</p>
            <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0F7377] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Accelerate Your Startup?</h2>
            <p className="mb-8 text-lg text-white/90">
              Join GrowthLab and take your startup to the next level with funding, mentorship, and resources.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                <Link href="/accelerator/apply">Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/contact">Schedule a Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
