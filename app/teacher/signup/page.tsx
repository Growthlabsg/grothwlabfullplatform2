import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { TeacherSignupForm } from "@/components/teacher/teacher-signup-form"

export const metadata: Metadata = {
  title: "Apply to be a Teacher | GrowthLab.sg",
  description: "Join GrowthLab's Startup School and share your expertise with the next generation of founders",
}

export default function TeacherSignupPage() {
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
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Join GrowthLab Startup School</h1>
            <p className="mt-2 text-muted-foreground">
              Share your expertise and help shape the next generation of founders in Asia
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <TeacherSignupForm />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/teacher/login" className="text-[#0F7377] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
