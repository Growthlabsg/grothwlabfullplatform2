import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EventCategories() {
  const categories = [
    { name: "Pitch Nights", count: 12 },
    { name: "Workshops", count: 24 },
    { name: "Networking", count: 18 },
    { name: "Demo Days", count: 4 },
    { name: "Hackathons", count: 6 },
    { name: "Fireside Chats", count: 10 },
  ]

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-growthlab-slate">Event Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="outline"
              className="flex items-center gap-2 border-slate-200 hover:border-primary-200 hover:bg-primary-50 transition-all"
            >
              {category.name}
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-growthlab-gray">
                {category.count}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
