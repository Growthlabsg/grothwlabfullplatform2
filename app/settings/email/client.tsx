"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  marketingEmails: z.boolean().default(true),
  notificationEmails: z.boolean().default(true),
  securityEmails: z.boolean().default(true),
  digestFrequency: z.enum(["daily", "weekly", "monthly", "never"]),
  customDomain: z.string().optional(),
})

type EmailFormValues = z.infer<typeof emailFormSchema>

const defaultValues: Partial<EmailFormValues> = {
  email: "user@example.com",
  marketingEmails: true,
  notificationEmails: true,
  securityEmails: true,
  digestFrequency: "weekly",
  customDomain: "",
}

export default function EmailSettingsClient() {
  const [isPending, setIsPending] = useState(false)

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: EmailFormValues) {
    setIsPending(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      toast({
        title: "Email settings updated",
        description: "Your email preferences have been saved successfully.",
      })
      setIsPending(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Email Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your email address and notification preferences</p>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Primary Email</CardTitle>
              <CardDescription>Update your email address and manage verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the primary email used for account notifications and communications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Verification Required</AlertTitle>
                <AlertDescription>
                  A verification email has been sent to your new address. Please check your inbox.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what types of emails you'd like to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="notificationEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Platform Notifications</FormLabel>
                      <FormDescription>
                        Receive emails about your account activity, upcoming events, and new opportunities.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marketingEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Marketing Emails</FormLabel>
                      <FormDescription>
                        Receive emails about new features, special offers, and GrowthLab updates.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="securityEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Security Alerts</FormLabel>
                      <FormDescription>Receive emails about security updates and account activity.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} disabled />
                    </FormControl>
                    <FormMessage>Security emails cannot be disabled</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="digestFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Digest Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How often would you like to receive digest emails summarizing platform activity?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced email settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="customDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Email Domain</FormLabel>
                    <FormControl>
                      <Input placeholder="yourdomain.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enterprise users can set up a custom email domain for team communications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Email Settings"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
