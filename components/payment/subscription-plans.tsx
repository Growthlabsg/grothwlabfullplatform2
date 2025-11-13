"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { PaymentService, type SubscriptionPlan, type Subscription } from "@/lib/payment-service"

interface SubscriptionPlansProps {
  onSelectPlan?: (plan: SubscriptionPlan) => void
  showFeatures?: boolean
  className?: string
}

export function SubscriptionPlans({ onSelectPlan, showFeatures = true, className }: SubscriptionPlansProps) {
  const { t, formatCurrency } = useLanguage()
  const { user } = useAuth()
  const { toast } = useToast()
  const [plans, setPlans] = React.useState<SubscriptionPlan[]>([])
  const [currentSubscription, setCurrentSubscription] = React.useState<Subscription | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [selectedInterval, setSelectedInterval] = React.useState<"month" | "year">("month")

  // Fetch subscription plans and current subscription on mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansData, subscriptionData] = await Promise.all([
          PaymentService.getSubscriptionPlans(),
          user ? PaymentService.getUserSubscription(user.id) : null,
        ])

        setPlans(plansData)
        setCurrentSubscription(subscriptionData)
      } catch (error) {
        console.error("Failed to fetch subscription data:", error)
        toast({
          title: "Error",
          description: "Failed to load subscription data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, toast])

  // Handle plan selection
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (onSelectPlan) {
      onSelectPlan(plan)
    } else {
      // If no callback is provided, show a toast
      toast({
        title: "Plan Selected",
        description: `You selected the ${plan.name} plan. Please proceed to checkout.`,
      })
    }
  }

  // Check if plan is current subscription
  const isCurrentPlan = (planTier: string) => {
    return currentSubscription?.tier === planTier
  }

  // If loading, show skeleton
  if (loading) {
    return (
      <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="flex-1">
              <Skeleton className="h-4 w-full mb-4" />
              {showFeatures && (
                <div className="space-y-2">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center rounded-full border p-1 bg-muted/50">
          <Button
            variant={selectedInterval === "month" ? "default" : "ghost"}
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedInterval("month")}
          >
            Monthly
          </Button>
          <Button
            variant={selectedInterval === "year" ? "default" : "ghost"}
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedInterval("year")}
          >
            Yearly
            <Badge variant="secondary" className="ml-2">
              Save 20%
            </Badge>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          // Calculate yearly price (20% discount)
          const yearlyPrice = plan.price * 12 * 0.8
          const price = selectedInterval === "month" ? plan.price : yearlyPrice
          const interval = selectedInterval === "month" ? "/month" : "/year"

          return (
            <Card key={plan.id} className={`flex flex-col ${plan.isPopular ? "border-primary shadow-md" : ""}`}>
              <CardHeader>
                {plan.isPopular && <Badge className="w-fit mb-2">Most Popular</Badge>}
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{formatCurrency(price, plan.currency)}</span>
                  {price > 0 && <span className="text-sm text-muted-foreground">{interval}</span>}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {showFeatures && (
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={isCurrentPlan(plan.tier) ? "outline" : "default"}
                  disabled={isCurrentPlan(plan.tier)}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {isCurrentPlan(plan.tier) ? "Current Plan" : price === 0 ? "Get Started" : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
