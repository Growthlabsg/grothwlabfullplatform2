import { MeetingsInterface } from "@/components/meetings/meetings-interface"

export default function MeetingsPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        <MeetingsInterface />
      </div>
    </div>
  )
}
