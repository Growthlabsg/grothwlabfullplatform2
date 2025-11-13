import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Mentor {
  id: string
  name: string
  expertise: string[]
  avatar: string
  company: string
  nextSession?: string
}

interface MentorConnectionsProps {
  mentors: Mentor[]
  className?: string
}

export function MentorConnections({ mentors, className }: MentorConnectionsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Mentor Connections</CardTitle>
        <CardDescription>Your assigned mentors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{mentor.name}</h3>
                  <Button variant="outline" size="sm">
                    Schedule
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">{mentor.company}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mentor.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                {mentor.nextSession && (
                  <div className="text-xs text-muted-foreground mt-2">Next session: {mentor.nextSession}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
