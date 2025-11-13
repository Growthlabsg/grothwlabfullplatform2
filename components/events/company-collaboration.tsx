import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CompanyCollaboration() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Collaborate on an Event</CardTitle>
        <CardDescription>
          Partner with GrowthLab to host events like hackathons, pitch nights, or workshops.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" placeholder="Your company name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input id="contact-email" type="email" placeholder="email@company.com" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="event-type">Event Type</Label>
          <Select>
            <SelectTrigger id="event-type">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hackathon">Hackathon</SelectItem>
              <SelectItem value="pitch-night">Pitch Night</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="networking">Networking Event</SelectItem>
              <SelectItem value="fireside">Fireside Chat</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="proposed-date">Proposed Date</Label>
            <Input id="proposed-date" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Estimated Budget (SGD)</Label>
            <Input id="budget" type="number" placeholder="5000" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="event-description">Event Description</Label>
          <Textarea
            id="event-description"
            placeholder="Describe your event idea, target audience, and expected outcomes..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sponsorship-tier">Sponsorship Tier</Label>
          <Select>
            <SelectTrigger id="sponsorship-tier">
              <SelectValue placeholder="Select sponsorship tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gold">Gold (SGD 10,000+)</SelectItem>
              <SelectItem value="silver">Silver (SGD 5,000+)</SelectItem>
              <SelectItem value="bronze">Bronze (SGD 2,500+)</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Save Draft</Button>
        <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">Submit Proposal</Button>
      </CardFooter>
    </Card>
  )
}
