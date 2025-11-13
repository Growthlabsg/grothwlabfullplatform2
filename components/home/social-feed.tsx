import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SocialFeed() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-growthlab-slate">Social Feed</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="linkedin">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="linkedin"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium data-[state=active]:border-primary-500 data-[state=active]:text-primary-500 data-[state=active]:bg-transparent transition-all"
            >
              LinkedIn
            </TabsTrigger>
            <TabsTrigger
              value="instagram"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium data-[state=active]:border-primary-500 data-[state=active]:text-primary-500 data-[state=active]:bg-transparent transition-all"
            >
              Instagram
            </TabsTrigger>
            <TabsTrigger
              value="twitter"
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium data-[state=active]:border-primary-500 data-[state=active]:text-primary-500 data-[state=active]:bg-transparent transition-all"
            >
              Twitter
            </TabsTrigger>
          </TabsList>
          <TabsContent value="linkedin" className="p-4 animate-fade-in">
            <div className="space-y-4">
              <div className="rounded-md bg-slate-50 p-4 border border-slate-100">
                <p className="text-sm text-growthlab-gray leading-relaxed">
                  &ldquo;Excited to announce our latest cohort of startups at GrowthLab! 15 innovative teams from across Asia
                  working on solutions in #fintech #healthtech and #sustainability&rdquo;
                </p>
                <p className="mt-2 text-xs text-growthlab-gray/70">2 days ago</p>
              </div>
              <div className="rounded-md bg-slate-50 p-4 border border-slate-100">
                <p className="text-sm text-growthlab-gray leading-relaxed">
                  &ldquo;Our Demo Day is coming up next month! Investors, mark your calendars for May 15th to see the most
                  promising startups in Southeast Asia pitch their solutions.&rdquo;
                </p>
                <p className="mt-2 text-xs text-growthlab-gray/70">1 week ago</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="instagram" className="p-4 animate-fade-in">
            <div className="space-y-4">
              <div className="rounded-md bg-slate-50 p-4 border border-slate-100">
                <p className="text-sm text-growthlab-gray leading-relaxed">
                  &ldquo;Behind the scenes at our Founder Networking Night! Great conversations and connections being made.
                  #startuplife #singapore #growthlab&rdquo;
                </p>
                <p className="mt-2 text-xs text-growthlab-gray/70">3 days ago</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="twitter" className="p-4 animate-fade-in">
            <div className="space-y-4">
              <div className="rounded-md bg-slate-50 p-4 border border-slate-100">
                <p className="text-sm text-growthlab-gray leading-relaxed">
                  &ldquo;Applications for our next cohort close in 2 weeks! Don't miss your chance to join Asia's premier
                  startup accelerator. Apply now at growthlab.sg/apply&rdquo;
                </p>
                <p className="mt-2 text-xs text-growthlab-gray/70">5 hours ago</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
