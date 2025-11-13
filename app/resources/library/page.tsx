import type { Metadata } from "next"
import { EnhancedResourceLibrary, FeaturedResources, PopularResources } from "@/components/resources/enhanced-resource-library"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Startup Resources Library | GrowthLab",
  description: "Comprehensive collection of startup resources including guides, templates, tools, and calculators for every stage of your startup journey.",
}

export default function ResourcesLibraryPage() {
  return (
    <div>
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Startup Resources Library</h1>
          <p className="text-xl text-[#334155] max-w-3xl">
            Access our comprehensive collection of startup resources, tools, and guides designed to help you build, launch, and grow your startup successfully.
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <EnhancedResourceLibrary />
          </TabsContent>

          <TabsContent value="featured" className="space-y-8">
            <FeaturedResources />
          </TabsContent>

          <TabsContent value="popular" className="space-y-8">
            <PopularResources />
          </TabsContent>

          <TabsContent value="search" className="space-y-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Search Resources</h2>
              <p className="text-gray-600">
                Use advanced search and filtering to find exactly what you need for your startup journey.
              </p>
            </div>
            <EnhancedResourceLibrary />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
