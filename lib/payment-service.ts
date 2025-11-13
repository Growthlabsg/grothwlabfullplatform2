// Define payment method types
export type PaymentMethodType = "credit_card" | "bank_transfer" | "paypal" | "stripe" | "paynow" | "grabpay"

// Define payment status
export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded"

// Define subscription tier
export type SubscriptionTier = "free" | "basic" | "pro" | "enterprise"

// Define payment method interface
export interface PaymentMethod {
  id: string
  type: PaymentMethodType
  last4?: string
  expiryMonth?: number
  expiryYear?: number
  holderName?: string
  isDefault: boolean
  createdAt: string
}

// Define payment interface
export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  description: string
  status: PaymentStatus
  paymentMethodId: string
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

// Define subscription interface
export interface Subscription {
  id: string
  userId: string
  tier: SubscriptionTier
  status: "active" | "canceled" | "past_due" | "trialing" | "paused"
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  paymentMethodId: string
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

// Define subscription plan interface
export interface SubscriptionPlan {
  id: string
  name: string
  tier: SubscriptionTier
  description: string
  price: number
  currency: string
  interval: "month" | "year"
  features: string[]
  isPopular?: boolean
  metadata?: Record<string, any>
}

// Payment service class
export class PaymentService {
  /**
   * Get subscription plans
   * @returns Promise<SubscriptionPlan[]> Subscription plans
   */
  static async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    try {
      // In a real app, this would call an API to get subscription plans

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Return mock subscription plans
      return [
        {
          id: "plan_free",
          name: "Free",
          tier: "free",
          description: "Basic access to GrowthLab resources",
          price: 0,
          currency: "SGD",
          interval: "month",
          features: [
            "Access to community forums",
            "Basic resources library",
            "Attend public events",
            "Limited API access",
          ],
        },
        {
          id: "plan_basic",
          name: "Basic",
          tier: "basic",
          description: "Enhanced access for early-stage startups",
          price: 99,
          currency: "SGD",
          interval: "month",
          features: [
            "All Free features",
            "Mentor matching (2 sessions/month)",
            "Funding opportunity alerts",
            "Basic analytics dashboard",
            "Priority support",
          ],
        },
        {
          id: "plan_pro",
          name: "Pro",
          tier: "pro",
          description: "Full access for growing startups",
          price: 299,
          currency: "SGD",
          interval: "month",
          isPopular: true,
          features: [
            "All Basic features",
            "Mentor matching (unlimited)",
            "Investor introductions",
            "Advanced analytics dashboard",
            "Co-working space access",
            "Workshop discounts",
            "API access",
          ],
        },
        {
          id: "plan_enterprise",
          name: "Enterprise",
          tier: "enterprise",
          description: "Custom solutions for established companies",
          price: 999,
          currency: "SGD",
          interval: "month",
          features: [
            "All Pro features",
            "Dedicated account manager",
            "Custom integration support",
            "Private events and workshops",
            "Corporate innovation programs",
            "Unlimited API access",
            "White-label options",
          ],
        },
      ]
    } catch (error) {
      console.error("Failed to get subscription plans:", error)
      return []
    }
  }

  /**
   * Get user payment methods
   * @param userId User ID
   * @returns Promise<PaymentMethod[]> Payment methods
   */
  static async getUserPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    try {
      // In a real app, this would call an API to get user payment methods

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Return mock payment methods
      return [
        {
          id: "pm_1",
          type: "credit_card",
          last4: "4242",
          expiryMonth: 12,
          expiryYear: 2025,
          holderName: "John Doe",
          isDefault: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: "pm_2",
          type: "paynow",
          isDefault: false,
          createdAt: new Date().toISOString(),
        },
      ]
    } catch (error) {
      console.error("Failed to get user payment methods:", error)
      return []
    }
  }

  /**
   * Add payment method
   * @param userId User ID
   * @param paymentMethodData Payment method data
   * @returns Promise<PaymentMethod> Added payment method
   */
  static async addPaymentMethod(userId: string, paymentMethodData: Partial<PaymentMethod>): Promise<PaymentMethod> {
    try {
      // In a real app, this would call an API to add a payment method

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Return mock payment method
      return {
        id: `pm_${Date.now()}`,
        type: paymentMethodData.type || "credit_card",
        last4: paymentMethodData.last4 || "4242",
        expiryMonth: paymentMethodData.expiryMonth || 12,
        expiryYear: paymentMethodData.expiryYear || 2025,
        holderName: paymentMethodData.holderName || "John Doe",
        isDefault: paymentMethodData.isDefault || false,
        createdAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Failed to add payment method:", error)
      throw error
    }
  }

  /**
   * Remove payment method
   * @param userId User ID
   * @param paymentMethodId Payment method ID
   * @returns Promise<boolean> Success status
   */
  static async removePaymentMethod(userId: string, paymentMethodId: string): Promise<boolean> {
    try {
      // In a real app, this would call an API to remove a payment method

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return true
    } catch (error) {
      console.error("Failed to remove payment method:", error)
      return false
    }
  }

  /**
   * Set default payment method
   * @param userId User ID
   * @param paymentMethodId Payment method ID
   * @returns Promise<boolean> Success status
   */
  static async setDefaultPaymentMethod(userId: string, paymentMethodId: string): Promise<boolean> {
    try {
      // In a real app, this would call an API to set default payment method

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return true
    } catch (error) {
      console.error("Failed to set default payment method:", error)
      return false
    }
  }

  /**
   * Create payment
   * @param userId User ID
   * @param amount Amount
   * @param currency Currency
   * @param description Description
   * @param paymentMethodId Payment method ID
   * @param metadata Metadata
   * @returns Promise<Payment> Created payment
   */
  static async createPayment(
    userId: string,
    amount: number,
    currency: string,
    description: string,
    paymentMethodId: string,
    metadata?: Record<string, any>,
  ): Promise<Payment> {
    try {
      // In a real app, this would call an API to create a payment

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Return mock payment
      return {
        id: `payment_${Date.now()}`,
        userId,
        amount,
        currency,
        description,
        status: "completed",
        paymentMethodId,
        metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Failed to create payment:", error)
      throw error
    }
  }

  /**
   * Get user payments
   * @param userId User ID
   * @returns Promise<Payment[]> Payments
   */
  static async getUserPayments(userId: string): Promise<Payment[]> {
    try {
      // In a real app, this would call an API to get user payments

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Return mock payments
      return [
        {
          id: "payment_1",
          userId,
          amount: 299,
          currency: "SGD",
          description: "Pro Subscription - Monthly",
          status: "completed",
          paymentMethodId: "pm_1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "payment_2",
          userId,
          amount: 50,
          currency: "SGD",
          description: "Workshop: Pitch Deck Masterclass",
          status: "completed",
          paymentMethodId: "pm_1",
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]
    } catch (error) {
      console.error("Failed to get user payments:", error)
      return []
    }
  }

  /**
   * Create subscription
   * @param userId User ID
   * @param planId Plan ID
   * @param paymentMethodId Payment method ID
   * @param metadata Metadata
   * @returns Promise<Subscription> Created subscription
   */
  static async createSubscription(
    userId: string,
    planId: string,
    paymentMethodId: string,
    metadata?: Record<string, any>,
  ): Promise<Subscription> {
    try {
      // In a real app, this would call an API to create a subscription

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get plan tier from plan ID
      const tier = planId.includes("free")
        ? "free"
        : planId.includes("basic")
          ? "basic"
          : planId.includes("pro")
            ? "pro"
            : "enterprise"

      // Return mock subscription
      return {
        id: `sub_${Date.now()}`,
        userId,
        tier,
        status: "active",
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
        paymentMethodId,
        metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Failed to create subscription:", error)
      throw error
    }
  }

  /**
   * Get user subscription
   * @param userId User ID
   * @returns Promise<Subscription | null> Subscription or null
   */
  static async getUserSubscription(userId: string): Promise<Subscription | null> {
    try {
      // In a real app, this would call an API to get user subscription

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Return mock subscription
      return {
        id: "sub_1",
        userId,
        tier: "pro",
        status: "active",
        currentPeriodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false,
        paymentMethodId: "pm_1",
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      }
    } catch (error) {
      console.error("Failed to get user subscription:", error)
      return null
    }
  }

  /**
   * Cancel subscription
   * @param userId User ID
   * @param subscriptionId Subscription ID
   * @param cancelAtPeriodEnd Cancel at period end
   * @returns Promise<boolean> Success status
   */
  static async cancelSubscription(userId: string, subscriptionId: string, cancelAtPeriodEnd = true): Promise<boolean> {
    try {
      // In a real app, this would call an API to cancel a subscription

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return true
    } catch (error) {
      console.error("Failed to cancel subscription:", error)
      return false
    }
  }
}
