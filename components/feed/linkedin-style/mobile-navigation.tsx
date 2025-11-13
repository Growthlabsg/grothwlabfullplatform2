"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Users, User, MessageSquare, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

export function MobileNavigation() {
  const router = useRouter()

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-14 md:hidden z-10">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/feed">
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/network">
            <Users className="h-5 w-5" />
            <span className="sr-only">My Network</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/messages">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/notifications">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>
      </div>
    </>
  )
}
