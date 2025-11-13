import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MentorLoginForm } from "@/components/mentor/mentor-login-form"

export const metadata: Metadata = {
  title: "Mentor Login | GrowthLab.sg",
  description: "Sign in to access your mentor dashboard and connect with mentees",
}

export default function MentorLoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image src="/images/GrowthLab Icon (1).png" alt="GrowthLab Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-[#333333]">GrowthLab</span>
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row">
          <div className="flex flex-1 flex-col justify-center md:order-2">
            <div className="mx-auto w-full max-w-md">
              <MentorLoginForm />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center md:order-1">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-[#0F7377]/10 px-3 py-1 text-sm text-[#0F7377]">
                GrowthLab Mentorship Program
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome back, Mentor</h1>
              <p className="max-w-md text-muted-foreground">
                Your guidance and expertise are shaping the next generation of founders in Asia's startup ecosystem.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-[#0F7377]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Manage your mentoring sessions
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-[#0F7377]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Track progress of your mentees
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-[#0F7377]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Share resources with the community
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-[#0F7377]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Connect with other mentors and investors
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
