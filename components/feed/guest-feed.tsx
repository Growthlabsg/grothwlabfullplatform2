"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Lock, Users, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Limited demo content for guests
const guestPosts = [
  {
    id: "guest1",
    author: {
      name: "GrowthLab Community",
      headline: "Platform Showcase",
      avatar: "/images/GrowthLab Icon (1).png",
      verified: true,
    },
    content: "🚀 Welcome to GrowthLab! This is a sample post to show you what our platform looks like.\n\nJoin thousands of entrepreneurs, investors, and professionals who are building the future together.\n\n#growthlab #community #startup #networking",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 8,
    tags: ["growthlab", "community", "startup", "networking"]
  },
  {
    id: "guest2",
    author: {
      name: "Enterprise Singapore",
      headline: "Government Agency",
      avatar: "/enterprise-sg-logo.png",
      verified: true,
    },
    content: "📢 Applications for the Startup SG Founder grant are now open!\n\nEligible first-time entrepreneurs can receive a startup capital grant of S$50,000 to kickstart their business ideas.\n\nApply before June 30th, 2024!\n\n#startupsg #funding #entrepreneurship #singapore",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 156,
    comments: 23,
    tags: ["startupsg", "funding", "entrepreneurship", "singapore"]
  }
]

export function GuestFeed() {
  return (
    <div className="space-y-6">
      {/* Login Banner */}
      <Card className="border-2 border-[#0F7377] bg-gradient-to-r from-[#0F7377]/5 to-[#0F7377]/10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-[#0F7377] mr-3" />
            <h2 className="text-2xl font-bold text-[#0F7377]">Guest Preview</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            You're viewing a limited preview of GrowthLab. Sign in to access the full experience!
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white px-8 py-3">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="px-8 py-3">
                Create Account
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <Users className="h-6 w-6 text-[#0F7377] mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Connect</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Build your network</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <TrendingUp className="h-6 w-6 text-[#0F7377] mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Grow</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Scale your business</p>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <Star className="h-6 w-6 text-[#0F7377] mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Learn</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Access resources</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Limited Feed Content */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Community Highlights
        </h3>
        
        {guestPosts.map((post) => (
          <Card key={post.id} className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {post.author.name}
                    </h4>
                    {post.author.verified && (
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {post.author.headline}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-900 dark:text-white mb-4 whitespace-pre-line">
                {post.content}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
                <span>{new Date(post.timestamp).toLocaleDateString()}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <Card className="text-center border-2 border-dashed border-gray-300 dark:border-gray-600">
        <CardContent className="pt-6">
          <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Ready to join the community?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Sign in to access personalized content, connect with professionals, and grow your network.
          </p>
          <Link href="/login">
            <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white px-8 py-3">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
