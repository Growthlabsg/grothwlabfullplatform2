"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreditCard, Calendar, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { PaymentService, type SubscriptionPlan } from "@/lib/payment-service"

// Define form schema
const paymentFormSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number must be at most 19 digits")
    .regex(/^[0-9\s]+$/, "Card number must contain only digits"),
  cardholderName: z.string().min(3, "Cardholder name is required"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format"),
  cvv: z
    .string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV must be at most 4 digits")
    .regex(/^[0-9]+$/, "CVV must contain only digits"),
})

interface PaymentFormProps {
  plan?: SubscriptionPlan
  amount?: number
  currency?: string
  description?: string
  onSuccess?: () => void
  onCancel?: () => void
  className?: string
}

export function PaymentForm({
  plan,
  amount,
  currency = "SGD",
  description,
  onSuccess,
  onCancel,
  className,
}: PaymentFormProps) {
  const { t, formatCurrency } = useLanguage()
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  })

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to make a payment.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Extract month and year from expiry date
      const [expiryMonth, expiryYear] = data.expiryDate.split("/")

      // Add payment method
      const paymentMethod = await PaymentService.addPaymentMethod(user.id, {
        type: "credit_card",
        last4: data.cardNumber.slice(-4),
        expiryMonth: Number.parseInt(expiryMonth, 10),
        expiryYear: Number.parseInt(`20${expiryYear}`, 10),
        holderName: data.cardholderName,
        isDefault: true,
      })

      // If subscribing to a plan
      if (plan) {
        await PaymentService.createSubscription(user.id, plan.id, paymentMethod.id)

        toast({
          title: "Subscription Successful",
          description: `You have successfully subscribed to the ${plan.name} plan.`,
        })
      }
      // If making a one-time payment
      else if (amount) {
        await PaymentService.createPayment(
          user.id,
          amount,
          currency,
          description || "One-time payment",
          paymentMethod.id,
        )

        toast({
          title: "Payment Successful",
          description: `Your payment of ${formatCurrency(amount, currency)} has been processed.`,
        })
      }

      // Call success callback
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          {plan
            ? `Subscribe to ${plan.name} plan for ${formatCurrency(plan.price, plan.currency)}/${plan.interval}`
            : amount
              ? `Pay ${formatCurrency(amount, currency)}`
              : "Enter your payment details"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="1234 5678 9012 3456"
                        onChange={(e) => {
                          field.onChange(formatCardNumber(e.target.value))
                        }}
                        maxLength={19}
                      />
                      <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="MM/YY"
                          onChange={(e) => {
                            field.onChange(formatExpiryDate(e.target.value))
                          }}
                          maxLength={5}
                        />
                        <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="password" placeholder="123" maxLength={4} />
                        <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Total:</span>
                <span className="text-lg font-bold">
                  {plan
                    ? `${formatCurrency(plan.price, plan.currency)}/${plan.interval}`
                    : amount
                      ? formatCurrency(amount, currency)
                      : "-"}
                </span>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "Processing..." : "Pay Now"}
                </Button>
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 border-t pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </CardFooter>
    </Card>
  )
}
