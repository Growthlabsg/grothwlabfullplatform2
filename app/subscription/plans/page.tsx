"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Users, Building2, Rocket } from "lucide-react"
import { useSubscription } from "@/contexts/subscription-context"
import { DEFAULT_SUBSCRIPTION_PLANS, SUBSCRIPTION_BENEFITS } from "@/types/subscription"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function SubscriptionPlansPage() {
  const { 
    currentTier, 
    upgradeSubscription, 
    isLoading,
    getCurrentUsage,
    getFeatureLimit,
    getUsagePercentage
  } = useSubscription()
  
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [upgrading, setUpgrading] = useState(false)

  const handleUpgrade = async (planId: string) => {
    try {
      setUpgrading(true)
      await upgradeSubscription(planId)
      setShowUpgradeDialog(false)
      setSelectedPlan(null)
    } catch (error) {
      console.error("Upgrade failed:", error)
    } finally {
      setUpgrading(false)
    }
  }

  const getCurrentUsageDisplay = (feature: string) => {
    const current = getCurrentUsage(feature)
    const limit = getFeatureLimit(feature)
    const percentage = getUsagePercentage(feature)
    
    if (limit === -1) return { current, limit: "∞", percentage: 0, isUnlimited: true }
    
    return { current, limit, percentage, isUnlimited: false }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F7377] to-[#0F7377]/90 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Choose Your GrowthLab Plan
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md leading-relaxed">
              Unlock your startup's potential with the right level of access and support
            </p>
            <div className="flex items-center justify-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>30-day money back</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Plan Status */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0F7377] mb-6 text-center">
              Your Current Plan: GrowthLab {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {["connectionRequests", "jobApplications", "cofounderMatches", "eventRegistrations"].map((feature) => {
                const usage = getCurrentUsageDisplay(feature)
                const featureName = feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                
                return (
                  <Card key={feature} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-[#0F7377] mb-2">
                        {usage.current}/{usage.isUnlimited ? "∞" : usage.limit}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">{featureName}</div>
                      {!usage.isUnlimited && (
                        <Progress value={usage.percentage} className="h-2" />
                      )}
                      {usage.isUnlimited && (
                        <Badge className="bg-green-100 text-green-800">Unlimited</Badge>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F7377] mb-4">
              Choose the Right Plan for You
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start with our free plan and upgrade as you grow. All plans include our core features with different usage limits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {DEFAULT_SUBSCRIPTION_PLANS.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  plan.isPopular ? 'ring-2 ring-[#F59E0B] shadow-2xl' : 'hover:shadow-xl'
                } ${currentTier === plan.tier ? 'ring-2 ring-[#0F7377]' : ''}`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-[#F59E0B] text-white px-4 py-2 text-sm font-semibold rounded-bl-lg">
                    <Star className="w-4 h-4 inline mr-2" />
                    Most Popular
                  </div>
                )}
                
                {currentTier === plan.tier && (
                  <div className="absolute top-0 left-0 bg-[#0F7377] text-white px-4 py-2 text-sm font-semibold rounded-br-lg">
                    <Check className="w-4 h-4 inline mr-2" />
                    Current Plan
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center mb-4">
                    {plan.tier === "free" && <Users className="w-8 h-8 text-[#0F7377]" />}
                    {plan.tier === "premium" && <Zap className="w-8 h-8 text-[#F59E0B]" />}
                    {plan.tier === "enterprise" && <Crown className="w-8 h-8 text-purple-600" />}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-[#0F7377] mb-2">
                    ${plan.price}
                    <span className="text-lg text-gray-500 font-normal">/month</span>
                  </div>
                  <p className="text-gray-600">Billed monthly</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {SUBSCRIPTION_BENEFITS[plan.tier].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    {currentTier === plan.tier ? (
                      <Button 
                        className="w-full bg-gray-100 text-gray-600 cursor-not-allowed" 
                        disabled
                      >
                        Current Plan
                      </Button>
                    ) : (
                      <Button 
                        className={`w-full ${
                          plan.tier === "premium" 
                            ? "bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white" 
                            : "bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                        } font-semibold shadow-lg hover:shadow-xl transition-all duration-200`}
                        onClick={() => {
                          setSelectedPlan(plan.id)
                          setShowUpgradeDialog(true)
                        }}
                      >
                        {plan.tier === "free" ? "Get Started" : "Upgrade Now"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F7377] mb-4">
              Detailed Feature Comparison
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See exactly what's included in each plan and choose the features that matter most to you.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Free</th>
                  <th className="text-center p-4 font-semibold text-[#0F7377]">Premium</th>
                  <th className="text-center p-4 font-semibold text-purple-600">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Connection Requests", free: "8/month", premium: "Unlimited", enterprise: "Unlimited" },
                  { name: "Job Applications", free: "5/month", premium: "Unlimited", enterprise: "Unlimited" },
                  { name: "Co-founder Matches", free: "3/month", premium: "Unlimited", enterprise: "Unlimited" },
                  { name: "Event Registrations", free: "3/month", premium: "Unlimited", enterprise: "Unlimited" },
                  { name: "Downloadable Templates", free: "3/month", premium: "Unlimited", enterprise: "Unlimited" },
                  { name: "Advanced Search Filters", free: "Limited", premium: "Full", enterprise: "AI-Powered" },
                  { name: "Analytics Depth", free: "Basic", premium: "Advanced", enterprise: "Premium" },
                  { name: "Support Response Time", free: "48 hours", premium: "4 hours", enterprise: "1 hour" },
                  { name: "Data Export", free: "No", premium: "Yes", enterprise: "Yes" },
                  { name: "Personalized Recommendations", free: "No", premium: "Yes", enterprise: "Yes" }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{row.name}</td>
                    <td className="p-4 text-center text-gray-600">{row.free}</td>
                    <td className="p-4 text-center text-[#0F7377] font-medium">{row.premium}</td>
                    <td className="p-4 text-center text-purple-600 font-medium">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of startups who have already transformed their businesses with GrowthLab
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 px-8 py-4 text-lg" 
              onClick={() => {
                setSelectedPlan("premium")
                setShowUpgradeDialog(true)
              }}
            >
              <Zap className="w-5 h-5 mr-3" />
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#0F7377] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg" 
            >
              <Building2 className="w-5 h-5 mr-3" />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Upgrade to {selectedPlan === "premium" ? "Premium" : selectedPlan === "enterprise" ? "Enterprise" : "Free"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {selectedPlan === "premium" 
                  ? "Unlock unlimited access to all GrowthLab features and accelerate your startup's growth."
                  : selectedPlan === "enterprise"
                  ? "Get enterprise-level features with dedicated support and advanced analytics."
                  : "Start your journey with our free plan and upgrade as you grow."
                }
              </p>
              
              {selectedPlan && selectedPlan !== "free" && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-[#0F7377] mb-2">
                    ${DEFAULT_SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.price}/month
                  </div>
                  <div className="text-sm text-gray-600">
                    Billed monthly • Cancel anytime
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => setShowUpgradeDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className={`flex-1 ${
                  selectedPlan === "premium" 
                    ? "bg-[#F59E0B] hover:bg-[#F59E0B]/90" 
                    : "bg-[#0F7377] hover:bg-[#0F7377]/90"
                }`}
                onClick={() => selectedPlan && handleUpgrade(selectedPlan)}
                disabled={upgrading}
              >
                {upgrading ? "Processing..." : "Upgrade Now"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
