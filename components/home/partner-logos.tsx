import Image from "next/image"

export function PartnerLogos() {
  const partners = [
    { name: "Enterprise Singapore", logo: "/enterprise-singapore-building.png" },
    { name: "DBS Bank", logo: "/placeholder.svg?height=60&width=120&query=dbs bank logo" },
    { name: "Google for Startups", logo: "/placeholder.svg?height=60&width=120&query=google for startups logo" },
    { name: "AWS", logo: "/placeholder.svg?height=60&width=120&query=aws logo" },
    { name: "SGInnovate", logo: "/placeholder.svg?height=60&width=120&query=sginnovate logo" },
    { name: "NUS Enterprise", logo: "/placeholder.svg?height=60&width=120&query=nus enterprise logo" },
  ]

  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
      {partners.map((partner) => (
        <div key={partner.name} className="flex items-center justify-center group">
          <div className="relative h-12 w-28 transition-all duration-300 opacity-80 grayscale hover:opacity-100 hover:grayscale-0">
            <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
          </div>
        </div>
      ))}
    </div>
  )
}
