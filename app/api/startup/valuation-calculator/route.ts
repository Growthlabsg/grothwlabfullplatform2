/**
 * API route for startup valuation calculations
 */

import { type NextRequest, NextResponse } from "next/server"

// Types for the valuation calculator
interface ValuationRequest {
  method: "DCF" | "VC" | "Comparable" | "First Chicago" | "Scorecard" | "Berkus"
  startupId: string
  inputs: Record<string, any>
}

interface ValuationResult {
  valuation: number
  breakdown: Record<string, any>
  method: string
  startupId: string
  date: string
}

/**
 * Calculate startup valuation using different methods
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const requestData: ValuationRequest = await req.json()

    // Validate request
    if (!requestData.method || !requestData.startupId || !requestData.inputs) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate valuation based on method
    const result = calculateValuation(requestData)

    // Store valuation result in database
    // In a real implementation, this would save to a database
    // For now, we're just returning the calculated result

    return NextResponse.json(result)
  } catch (error) {
    console.error("Valuation calculation error:", error)
    return NextResponse.json({ error: "Failed to calculate valuation" }, { status: 500 })
  }
}

/**
 * Get valuation history for a startup
 */
export async function GET(req: NextRequest) {
  try {
    // Get startup ID from query params
    const searchParams = req.nextUrl.searchParams
    const startupId = searchParams.get("startupId")

    if (!startupId) {
      return NextResponse.json({ error: "Missing startupId parameter" }, { status: 400 })
    }

    // In a real implementation, this would fetch from a database
    // For now, we're returning mock data
    const mockHistory = [
      {
        id: "1",
        valuation: 5000000,
        method: "DCF",
        startupId,
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        breakdown: {
          revenue: 500000,
          growthRate: 0.25,
          discountRate: 0.2,
          periods: 5,
        },
      },
      {
        id: "2",
        valuation: 5500000,
        method: "Comparable",
        startupId,
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        breakdown: {
          revenueMultiple: 10,
          annualRevenue: 550000,
        },
      },
      {
        id: "3",
        valuation: 6000000,
        method: "VC",
        startupId,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        breakdown: {
          projectedExitValue: 30000000,
          expectedReturn: 5,
          yearsToExit: 5,
        },
      },
    ]

    return NextResponse.json(mockHistory)
  } catch (error) {
    console.error("Valuation history fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch valuation history" }, { status: 500 })
  }
}

/**
 * Calculate valuation based on the requested method
 * @param request Valuation request data
 */
function calculateValuation(request: ValuationRequest): ValuationResult {
  const { method, startupId, inputs } = request

  // Initialize result with common fields
  const result: ValuationResult = {
    valuation: 0,
    breakdown: {},
    method,
    startupId,
    date: new Date().toISOString(),
  }

  // Calculate based on method
  switch (method) {
    case "DCF":
      return calculateDCF(inputs, result)
    case "VC":
      return calculateVCMethod(inputs, result)
    case "Comparable":
      return calculateComparable(inputs, result)
    case "First Chicago":
      return calculateFirstChicago(inputs, result)
    case "Scorecard":
      return calculateScorecard(inputs, result)
    case "Berkus":
      return calculateBerkus(inputs, result)
    default:
      throw new Error(`Unsupported valuation method: ${method}`)
  }
}

/**
 * Discounted Cash Flow method
 */
function calculateDCF(inputs: any, result: ValuationResult): ValuationResult {
  const { initialCashFlow, growthRate, discountRate, periods, terminalValue } = inputs

  let presentValue = 0
  const cashFlows = []

  // Calculate present value of projected cash flows
  let cashFlow = initialCashFlow
  for (let year = 1; year <= periods; year++) {
    cashFlow *= 1 + growthRate
    const discountFactor = Math.pow(1 + discountRate, year)
    const presentValueOfCashFlow = cashFlow / discountFactor

    cashFlows.push({
      year,
      cashFlow,
      discountFactor,
      presentValue: presentValueOfCashFlow,
    })

    presentValue += presentValueOfCashFlow
  }

  // Add terminal value if provided
  let terminalPresentValue = 0
  if (terminalValue) {
    const discountFactor = Math.pow(1 + discountRate, periods)
    terminalPresentValue = terminalValue / discountFactor
    presentValue += terminalPresentValue
  }

  // Set result
  result.valuation = Math.round(presentValue)
  result.breakdown = {
    cashFlows,
    terminalValue,
    terminalPresentValue,
    totalPresentValue: presentValue,
    inputs,
  }

  return result
}

/**
 * Venture Capital method
 */
function calculateVCMethod(inputs: any, result: ValuationResult): ValuationResult {
  const { projectedExitValue, expectedReturn, yearsToExit, investmentAmount } = inputs

  // Calculate post-money valuation
  const postMoneyValuation = projectedExitValue / Math.pow(expectedReturn, yearsToExit)

  // Calculate pre-money valuation if investment amount is provided
  let preMoneyValuation = postMoneyValuation
  if (investmentAmount) {
    preMoneyValuation = postMoneyValuation - investmentAmount
  }

  // Set result
  result.valuation = Math.round(preMoneyValuation)
  result.breakdown = {
    projectedExitValue,
    expectedReturn,
    yearsToExit,
    postMoneyValuation,
    preMoneyValuation,
    investmentAmount,
  }

  return result
}

/**
 * Comparable Companies method
 */
function calculateComparable(inputs: any, result: ValuationResult): ValuationResult {
  const { metric, metricValue, multipleRange, adjustmentFactor } = inputs

  // Calculate average multiple from range
  const multiple = (multipleRange.min + multipleRange.max) / 2

  // Calculate valuation
  let valuation = metricValue * multiple

  // Apply adjustment factor if provided
  if (adjustmentFactor) {
    valuation *= adjustmentFactor
  }

  // Set result
  result.valuation = Math.round(valuation)
  result.breakdown = {
    metric,
    metricValue,
    multipleRange,
    multipleUsed: multiple,
    adjustmentFactor,
    unadjustedValuation: metricValue * multiple,
  }

  return result
}

/**
 * First Chicago method (weighted scenarios)
 */
function calculateFirstChicago(inputs: any, result: ValuationResult): ValuationResult {
  const { scenarios } = inputs

  // Calculate weighted average of scenario valuations
  let totalWeight = 0
  let weightedValuation = 0

  scenarios.forEach((scenario: any) => {
    totalWeight += scenario.probability
    weightedValuation += scenario.valuation * scenario.probability
  })

  // Normalize if total probability is not 1
  if (totalWeight !== 1) {
    weightedValuation = weightedValuation / totalWeight
  }

  // Set result
  result.valuation = Math.round(weightedValuation)
  result.breakdown = {
    scenarios,
    totalWeight,
    weightedValuation,
  }

  return result
}

/**
 * Scorecard method
 */
function calculateScorecard(inputs: any, result: ValuationResult): ValuationResult {
  const { averageValuation, factors } = inputs

  // Calculate sum of weighted factors
  let factorSum = 0
  factors.forEach((factor: any) => {
    factorSum += factor.weight * factor.score
  })

  // Calculate valuation
  const valuation = averageValuation * factorSum

  // Set result
  result.valuation = Math.round(valuation)
  result.breakdown = {
    averageValuation,
    factors,
    factorSum,
  }

  return result
}

/**
 * Berkus method
 */
function calculateBerkus(inputs: any, result: ValuationResult): ValuationResult {
  const { baseValue, soundIdea, prototype, qualityManagement, strategicRelationships, productRollout } = inputs

  // Calculate valuation by adding value of each factor
  const valuation =
    baseValue +
    (soundIdea || 0) +
    (prototype || 0) +
    (qualityManagement || 0) +
    (strategicRelationships || 0) +
    (productRollout || 0)

  // Set result
  result.valuation = Math.round(valuation)
  result.breakdown = {
    baseValue,
    factors: {
      soundIdea,
      prototype,
      qualityManagement,
      strategicRelationships,
      productRollout,
    },
  }

  return result
}
