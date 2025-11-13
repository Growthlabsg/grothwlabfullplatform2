"use client"

import { CommunicationProvider } from "@/contexts/communication-context"
import { CommunicationHub } from "@/components/communication/communication-hub"
import CoFounderMatchingPage from "../page"

export default function FindCoFounderWithCommunicationPage() {
  return (
    <CommunicationProvider>
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <CoFounderMatchingPage />
        </div>
        
        {/* Communication Hub Sidebar */}
        <div className="hidden lg:block w-80 border-l border-gray-200">
          <CommunicationHub />
        </div>
      </div>
    </CommunicationProvider>
  )
}
