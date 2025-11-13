"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  Mail,
  Phone
} from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqCategories = [
    {
      title: "General",
      items: [
        {
          question: "What is GrowthLab?",
          answer: "GrowthLab is Asia's leading startup ecosystem platform that connects founders, investors, and mentors. We provide comprehensive resources, programs, and community support to help startups scale and succeed."
        },
        {
          question: "How do I join GrowthLab?",
          answer: "You can join GrowthLab by creating a free account on our platform. Simply click the 'Sign Up' button, fill in your details, and start exploring our community and resources."
        },
        {
          question: "Is GrowthLab free to use?",
          answer: "Yes! GrowthLab offers a free tier with access to our community, basic resources, and networking features. We also have premium programs like our accelerator for more intensive support."
        },
        {
          question: "What countries does GrowthLab serve?",
          answer: "GrowthLab serves startups across Asia, with a strong presence in Singapore, Hong Kong, Tokyo, Seoul, and other major Asian startup hubs. We're expanding our reach continuously."
        }
      ]
    },
    {
      title: "Accelerator Program",
      items: [
        {
          question: "What is the GrowthLab Accelerator?",
          answer: "The GrowthLab Accelerator is a 12-week intensive program designed for early-stage startups. It includes mentorship, funding opportunities, workshops, and access to our investor network."
        },
        {
          question: "How do I apply for the accelerator?",
          answer: "You can apply through our website by filling out the application form. We review applications quarterly and select 20 startups per cohort. The application process includes a written application, pitch deck, and interview."
        },
        {
          question: "What are the requirements for the accelerator?",
          answer: "We look for early-stage startups with a working product or MVP, a clear business model, and a strong founding team. Startups should be ready to scale and have the potential for significant growth."
        },
        {
          question: "What funding opportunities are available?",
          answer: "Our accelerator provides access to our investor network, pitch opportunities, and potential funding. We also offer equity-free grants and connections to venture capital firms and angel investors."
        }
      ]
    },
    {
      title: "Community & Networking",
      items: [
        {
          question: "How can I find a co-founder?",
          answer: "Use our co-founder matching feature to find potential partners based on skills, experience, and interests. You can also attend our networking events and join relevant community groups."
        },
        {
          question: "What networking events do you offer?",
          answer: "We host regular networking events, workshops, pitch nights, and industry meetups. Check our events calendar for upcoming opportunities to connect with other entrepreneurs and investors."
        },
        {
          question: "How can I connect with investors?",
          answer: "Our platform provides access to our investor directory, pitch opportunities, and investor networking events. Premium members get priority access to investor meetings and pitch sessions."
        },
        {
          question: "Can I host events on GrowthLab?",
          answer: "Yes! You can create and host events through our platform. We provide tools for event management, promotion, and attendee engagement."
        }
      ]
    },
    {
      title: "Jobs & Careers",
      items: [
        {
          question: "How do I find startup jobs?",
          answer: "Browse our job board to find opportunities at startups in our network. You can filter by location, role, company size, and other criteria to find the perfect match."
        },
        {
          question: "Can I post job openings?",
          answer: "Yes! If you're a startup in our network, you can post job openings on our platform. We help promote your opportunities to our community of talented professionals."
        },
        {
          question: "What types of roles are available?",
          answer: "We have a wide range of roles including technical positions, business development, marketing, operations, and executive roles across various industries and company stages."
        },
        {
          question: "How do I apply for jobs?",
          answer: "Simply click on any job posting to view details and apply directly through our platform. You can also set up job alerts to be notified of new opportunities."
        }
      ]
    },
    {
      title: "Sports Club",
      items: [
        {
          question: "What is the GrowthLab Sports Club?",
          answer: "The Sports Club is our community platform for entrepreneurs to connect through sports and physical activities. It includes various sports, events, and networking opportunities."
        },
        {
          question: "What sports are available?",
          answer: "We offer a wide range of sports including basketball, tennis, football, running, swimming, golf, and many more. You can also suggest new sports to add to our platform."
        },
        {
          question: "How do I join sports events?",
          answer: "Browse our sports events calendar and RSVP to events that interest you. You can also create your own sports events and invite other community members."
        },
        {
          question: "Are there any fees for sports events?",
          answer: "Some events may have fees to cover venue costs, equipment, or other expenses. Event organizers will clearly indicate any costs when creating events."
        }
      ]
    },
    {
      title: "Technical Support",
      items: [
        {
          question: "How do I reset my password?",
          answer: "Click on 'Forgot Password' on the login page and enter your email address. We'll send you a link to reset your password."
        },
        {
          question: "How do I update my profile?",
          answer: "Go to your profile settings and click 'Edit Profile' to update your information, skills, experience, and other details."
        },
        {
          question: "I'm having trouble with the platform. What should I do?",
          answer: "Contact our support team through the help center or email us at support@growthlab.asia. We typically respond within 24 hours."
        },
        {
          question: "How do I delete my account?",
          answer: "Go to your account settings and click 'Delete Account'. Please note that this action is irreversible and will remove all your data from our platform."
        }
      ]
    }
  ]

  const allFaqs = faqCategories.flatMap(category => 
    category.items.map((item, index) => ({
      ...item,
      category: category.title,
      globalIndex: faqCategories.slice(0, faqCategories.indexOf(category)).reduce((acc, cat) => acc + cat.items.length, 0) + index
    }))
  )

  const filteredFaqs = allFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Find answers to common questions about GrowthLab
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Search Results ({filteredFaqs.length})
            </h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <Card key={faq.globalIndex} className="border-0 shadow-lg bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">{faq.category}</Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Categories */}
        {!searchQuery && faqCategories.map((category, categoryIndex) => (
          <div key={category.title} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{category.title}</h2>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => {
                const globalIndex = faqCategories.slice(0, categoryIndex).reduce((acc, cat) => acc + cat.items.length, 0) + itemIndex
                const isOpen = openItems.includes(globalIndex)
                
                return (
                  <Card key={itemIndex} className="border-0 shadow-lg bg-white dark:bg-gray-800">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <h3 className="font-semibold text-gray-900 dark:text-white pr-4">{item.question}</h3>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}

        {/* Contact Support */}
        <Card className="mt-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white border-0">
          <CardContent className="p-8 text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-[#F59E0B]" />
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white" asChild>
                <Link href="/contact">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30" asChild>
                <Link href="mailto:support@growthlab.asia">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Us
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}