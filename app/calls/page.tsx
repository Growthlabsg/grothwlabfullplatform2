import { CallsInterface } from "@/components/calls/calls-interface"

export default function CallsPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        <CallsInterface />
      </div>
    </div>
  )
}
