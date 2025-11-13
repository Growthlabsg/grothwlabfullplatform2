import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  status: "active" | "away" | "offline"
}

interface TeamMembersProps {
  members: TeamMember[]
  className?: string
}

export function TeamMembers({ members, className }: TeamMembersProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "away":
        return "bg-amber-500"
      case "offline":
        return "bg-slate-400"
      default:
        return "bg-slate-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Online"
      case "away":
        return "Away"
      case "offline":
        return "Offline"
      default:
        return status
    }
  }

  return (
    <Card className={`border-slate-200 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-growthlab-slate">Team Members</CardTitle>
        <CardDescription>Your startup team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center space-x-4 p-2 rounded-lg transition-all hover:bg-slate-50 group"
            >
              <Avatar className="h-10 w-10 border border-slate-200">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback className="bg-primary-100 text-primary-700">{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium text-growthlab-slate group-hover:text-primary-500 transition-colors">
                  {member.name}
                </div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
              </div>
              <div className="flex items-center">
                <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(member.status)} mr-2`} />
                <span className="text-xs font-medium text-growthlab-gray">{getStatusText(member.status)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
