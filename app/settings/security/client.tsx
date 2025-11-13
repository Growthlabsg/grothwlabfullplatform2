"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Smartphone, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const securityFormSchema = z.object({
  twoFactorEnabled: z.boolean(),
  loginNotifications: z.boolean(),
  sessionTimeout: z.enum(["15min", "30min", "1hour", "4hours", "1day"]),
})

type PasswordFormValues = z.infer<typeof passwordFormSchema>
type SecurityFormValues = z.infer<typeof securityFormSchema>

const defaultSecurityValues: Partial<SecurityFormValues> = {
  twoFactorEnabled: false,
  loginNotifications: true,
  sessionTimeout: "1hour",
}

// Mock session data
const activeSessions = [
  {
    device: "Chrome on MacOS",
    location: "Singapore",
    ip: "192.168.1.1",
    lastActive: "Just now",
    current: true,
  },
  {
    device: "Safari on iPhone",
    location: "Singapore",
    ip: "192.168.1.2",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    device: "Firefox on Windows",
    location: "Jakarta, Indonesia",
    ip: "203.142.21.65",
    lastActive: "Yesterday",
    current: false,
  },
]

export default function SecuritySettingsClient() {
  const [isPending, setIsPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: defaultSecurityValues,
  })

  function onPasswordSubmit(data: PasswordFormValues) {
    setIsPending(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setIsPending(false)
    }, 1000)
  }

  function onSecuritySubmit(data: SecurityFormValues) {
    setIsPending(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      toast({
        title: "Security settings updated",
        description: "Your security preferences have been saved successfully.",
      })
      setIsPending(false)
    }, 1000)
  }

  function handleSessionTerminate(ip: string) {
    toast({
      title: "Session terminated",
      description: `The session from IP ${ip} has been terminated.`,
    })
  }

  function handleTerminateAllSessions() {
    toast({
      title: "All sessions terminated",
      description: "All other sessions have been terminated. You'll remain logged in on this device.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account security and authentication methods</p>
      </div>

      <Separator />

      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    <FormDescription>
                      Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Password"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Form {...securityForm}>
        <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={securityForm.control}
                name="twoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Two-Factor Authentication</FormLabel>
                      <FormDescription>Require a verification code when logging in from a new device.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {securityForm.watch("twoFactorEnabled") && (
                <Alert>
                  <Smartphone className="h-4 w-4" />
                  <AlertTitle>Setup Required</AlertTitle>
                  <AlertDescription>
                    Please set up an authenticator app to enable two-factor authentication.
                    <Button variant="link" className="p-0 h-auto font-normal">
                      Set up now
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Security</CardTitle>
              <CardDescription>Manage additional security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={securityForm.control}
                name="loginNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Login Notifications</FormLabel>
                      <FormDescription>
                        Receive email notifications when a new device logs into your account.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Security Settings"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage devices currently logged into your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSessions.map((session) => (
                <TableRow key={session.ip}>
                  <TableCell>
                    {session.device}
                    {session.current && (
                      <Badge variant="outline" className="ml-2">
                        Current
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell>{session.ip}</TableCell>
                  <TableCell>{session.lastActive}</TableCell>
                  <TableCell>
                    {!session.current && (
                      <Button variant="ghost" size="sm" onClick={() => handleSessionTerminate(session.ip)}>
                        Terminate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={handleTerminateAllSessions}>
            Terminate All Other Sessions
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
