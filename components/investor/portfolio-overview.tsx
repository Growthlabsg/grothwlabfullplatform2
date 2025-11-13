import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/utils/format"
import type { PortfolioCompany } from "@/types/investor-dashboard"

interface PortfolioOverviewProps {
  companies: PortfolioCompany[]
  className?: string
}

export function PortfolioOverview({ companies, className }: PortfolioOverviewProps) {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "acquired":
        return "bg-blue-100 text-blue-800"
      case "ipo":
        return "bg-purple-100 text-purple-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateReturn = (company: PortfolioCompany): number => {
    if (!company.currentValuation) return 0
    return (company.currentValuation - company.valuation) / company.valuation
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Portfolio Companies</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/investor/portfolio">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {companies.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No portfolio companies</p>
          </div>
        ) : (
          <div className="space-y-4">
            {companies.map((company) => {
              const returnPercentage = calculateReturn(company)
              const isPositive = returnPercentage >= 0

              return (
                <div key={company.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-md">
                        <Image
                          src={company.logo || "/placeholder.svg?height=40&width=40"}
                          alt={company.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1E293B]">{company.name}</h3>
                        <div className="text-xs text-muted-foreground">{company.industry}</div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(company.status)}>{company.status}</Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Investment</p>
                      <p className="font-medium">{formatCurrency(company.investmentAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Equity</p>
                      <p className="font-medium">{formatPercentage(company.equityPercentage)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Initial Valuation</p>
                      <p className="font-medium">{formatCurrency(company.valuation)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Current Valuation</p>
                      <p className="font-medium">
                        {company.currentValuation ? formatCurrency(company.currentValuation) : "N/A"}
                      </p>
                    </div>
                  </div>
                  {company.currentValuation && (
                    <div className="mt-3 flex items-center justify-end">
                      <div
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                          isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span>{formatPercentage(Math.abs(returnPercentage))}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
