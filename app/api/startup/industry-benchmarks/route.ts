/**
 * API route for industry benchmarks data
 */

import { type NextRequest, NextResponse } from "next/server"

// Interface for benchmark data
interface BenchmarkData {
  industry: string
  stage: string
  metric: string
  average: number
  median: number
  min: number
  max: number
  percentiles?: {
    p25: number
    p50: number
    p75: number
    p90: number
  }
  lastUpdated: string
}

/**
 * Get industry benchmarks data
 */
export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const industry = searchParams.get("industry")
    const stage = searchParams.get("stage")
    const metric = searchParams.get("metric")

    // In a real implementation, these parameters would be used to filter data from a database
    // For now, we're returning mock data

    // Mock benchmark data
    const benchmarks: BenchmarkData[] = [
      {
        industry: "SaaS",
        stage: "Seed",
        metric: "Valuation",
        average: 4500000,
        median: 4000000,
        min: 1000000,
        max: 10000000,
        percentiles: {
          p25: 2500000,
          p50: 4000000,
          p75: 6000000,
          p90: 8000000,
        },
        lastUpdated: new Date().toISOString(),
      },
      {
        industry: "SaaS",
        stage: "Series A",
        metric: "Valuation",
        average: 15000000,
        median: 12000000,
        min: 7000000,
        max: 35000000,
        percentiles: {
          p25: 9000000,
          p50: 12000000,
          p75: 18000000,
          p90: 25000000,
        },
        lastUpdated: new Date().toISOString(),
      },
      {
        industry: "SaaS",
        stage: "Seed",
        metric: "ARR Multiple",
        average: 12,
        median: 10,
        min: 5,
        max: 20,
        percentiles: {
          p25: 7,
          p50: 10,
          p75: 15,
          p90: 18,
        },
        lastUpdated: new Date().toISOString(),
      },
      {
        industry: "Fintech",
        stage: "Seed",
        metric: "Valuation",
        average: 5500000,
        median: 5000000,
        min: 2000000,
        max: 12000000,
        percentiles: {
          p25: 3500000,
          p50: 5000000,
          p75: 7500000,
          p90: 10000000,
        },
        lastUpdated: new Date().toISOString(),
      },
      {
        industry: "Fintech",
        stage: "Series A",
        metric: "Valuation",
        average: 18000000,
        median: 15000000,
        min: 8000000,
        max: 40000000,
        percentiles: {
          p25: 12000000,
          p50: 15000000,
          p75: 22000000,
          p90: 30000000,
        },
        lastUpdated: new Date().toISOString(),
      },
      {
        industry: "E-commerce",
        stage: "Seed",
        metric: "Valuation",
        average: 3500000,
        median: 3000000,
        min: 1000000,
        max: 8000000,
        percentiles: {
          p25: 2000000,
          p50: 3000000,
          p75: 4500000,
          p90: 6500000,
        },
        lastUpdated: new Date().toISOString(),
      },
      {
        industry: "Healthcare",
        stage: "Seed",
        metric: "Valuation",
        average: 6000000,
        median: 5500000,
        min: 2500000,
        max: 15000000,
        percentiles: {
          p25: 4000000,
          p50: 5500000,
          p75: 8000000,
          p90: 12000000,
        },
        lastUpdated: new Date().toISOString(),
      },
      {
        industry: "AI/ML",
        stage: "Seed",
        metric: "Valuation",
        average: 7500000,
        median: 6500000,
        min: 3000000,
        max: 20000000,
        percentiles: {
          p25: 5000000,
          p50: 6500000,
          p75: 10000000,
          p90: 15000000,
        },
        lastUpdated: new Date().toISOString(),
      },
      {
        industry: "SaaS",
        stage: "Seed",
        metric: "Revenue Growth",
        average: 150,
        median: 120,
        min: 50,
        max: 300,
        percentiles: {
          p25: 80,
          p50: 120,
          p75: 200,
          p90: 250,
        },
        lastUpdated: new Date().toISOString(),
      },
      {
        industry: "SaaS",
        stage: "Seed",
        metric: "Burn Rate",
        average: 80000,
        median: 70000,
        min: 30000,
        max: 150000,
        percentiles: {
          p25: 50000,
          p50: 70000,
          p75: 100000,
          p90: 130000,
        },
        lastUpdated: new Date().toISOString(),
      },
    ]

    // Filter benchmarks based on query parameters
    let filteredBenchmarks = benchmarks

    if (industry) {
      filteredBenchmarks = filteredBenchmarks.filter((b) => b.industry.toLowerCase() === industry.toLowerCase())
    }

    if (stage) {
      filteredBenchmarks = filteredBenchmarks.filter((b) => b.stage.toLowerCase() === stage.toLowerCase())
    }

    if (metric) {
      filteredBenchmarks = filteredBenchmarks.filter((b) => b.metric.toLowerCase() === metric.toLowerCase())
    }

    // Return filtered benchmarks
    return NextResponse.json({
      benchmarks: filteredBenchmarks,
      industries: Array.from(new Set(benchmarks.map((b) => b.industry))),
      stages: Array.from(new Set(benchmarks.map((b) => b.stage))),
      metrics: Array.from(new Set(benchmarks.map((b) => b.metric))),
    })
  } catch (error) {
    console.error("Industry benchmarks fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch industry benchmarks" }, { status: 500 })
  }
}

/**
 * Create or update benchmark data
 * This would typically be an admin-only endpoint
 */
export async function POST(req: NextRequest) {
  try {
    // Check for admin authentication
    // In a real implementation, this would verify the user has admin access

    // Parse request body
    const benchmarkData: BenchmarkData = await req.json()

    // Validate benchmark data
    if (!benchmarkData.industry || !benchmarkData.stage || !benchmarkData.metric) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real implementation, this would save to a database
    // For now, we're just returning the provided data

    return NextResponse.json({
      success: true,
      benchmark: {
        ...benchmarkData,
        lastUpdated: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Benchmark data update error:", error)
    return NextResponse.json({ error: "Failed to update benchmark data" }, { status: 500 })
  }
}
