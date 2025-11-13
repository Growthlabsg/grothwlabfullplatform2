"use client"

import { useState } from "react"
import { env } from "@/lib/env"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EnvironmentVariablesDemo() {
  const [showAll, setShowAll] = useState(false)

  // Test the different environment variable access methods
  const jwtSecret = env.jwtSecret
  const isDevelopment = env.isDevelopment()
  const port = env.port
  const valuationComparisonEnabled = env.features.valuationComparison

  // Test the mock variables that were added in the test
  const testVar = process.env.TEST_VAR || "Not set"
  const boolTrue = process.env.BOOL_TRUE === "true"
  const boolOne = process.env.BOOL_ONE === "1"
  const boolYes = process.env.BOOL_YES === "yes"
  const boolOn = process.env.BOOL_ON === "on"
  const boolFalse = process.env.BOOL_FALSE !== "true"
  const numVar = Number.parseInt(process.env.NUM_VAR || "0", 10)
  const invalidNum = isNaN(Number.parseInt(process.env.INVALID_NUM || "", 10))

  let jsonVar = {}
  try {
    jsonVar = JSON.parse(process.env.JSON_VAR || "{}")
  } catch (e) {
    // Invalid JSON
  }

  let invalidJson = false
  try {
    JSON.parse(process.env.INVALID_JSON || "{}")
  } catch (e) {
    invalidJson = true
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <InfoIcon className="h-5 w-5" />
          Environment Variables Demo
        </CardTitle>
        <CardDescription>
          Demonstrating how to use environment variables with the mock environment system
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Alert variant="default" className="bg-amber-50 border-amber-200">
          <AlertTriangleIcon className="h-4 w-4 text-amber-600" />
          <AlertTitle>Development Environment</AlertTitle>
          <AlertDescription>
            This component demonstrates how to use environment variables in your application. In production, you should
            never display sensitive environment variables.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="core">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="core">Core Variables</TabsTrigger>
            <TabsTrigger value="features">Feature Flags</TabsTrigger>
            <TabsTrigger value="test">Test Variables</TabsTrigger>
          </TabsList>

          <TabsContent value="core" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EnvVarCard
                name="JWT Secret"
                value={jwtSecret}
                type="string"
                isSensitive={true}
                description="Secret used for JWT token generation and validation"
              />

              <EnvVarCard
                name="Environment"
                value={isDevelopment ? "Development" : "Production"}
                type="boolean"
                isSensitive={false}
                description="Current environment mode"
              />

              <EnvVarCard
                name="Port"
                value={port.toString()}
                type="number"
                isSensitive={false}
                description="Server port number"
              />

              <EnvVarCard
                name="App URL"
                value={env.appUrl}
                type="string"
                isSensitive={false}
                description="Public URL of the application"
              />
            </div>
          </TabsContent>

          <TabsContent value="features">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature Flag</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <FeatureFlagRow
                  name="Valuation Comparison"
                  enabled={env.features.valuationComparison}
                  description="Compare startup valuations against industry benchmarks"
                />
                <FeatureFlagRow
                  name="Valuation History"
                  enabled={env.features.valuationHistory}
                  description="Track historical valuation changes over time"
                />
                <FeatureFlagRow
                  name="Report Generation"
                  enabled={env.features.reportGeneration}
                  description="Generate detailed PDF reports"
                />
                <FeatureFlagRow
                  name="Industry Benchmarks"
                  enabled={env.features.industryBenchmarks}
                  description="Access industry-specific performance benchmarks"
                />
                <FeatureFlagRow
                  name="Funding Navigator"
                  enabled={env.features.fundingNavigator}
                  description="Interactive funding source discovery tool"
                />
                <FeatureFlagRow
                  name="Customer Discovery"
                  enabled={env.features.customerDiscovery}
                  description="Tools for customer discovery and validation"
                />
                <FeatureFlagRow
                  name="Valuation Calculator"
                  enabled={env.features.valuationCalculator}
                  description="Calculate startup valuation based on multiple methods"
                />
                <FeatureFlagRow
                  name="Idea Validation"
                  enabled={env.features.ideaValidation}
                  description="Tools for validating startup ideas"
                />
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="test" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EnvVarCard
                name="TEST_VAR"
                value={testVar}
                type="string"
                isSensitive={false}
                description="Test variable for demonstration"
              />

              <EnvVarCard
                name="BOOL_TRUE"
                value={boolTrue ? "true" : "false"}
                type="boolean"
                isSensitive={false}
                description="Boolean variable set to 'true'"
              />

              <EnvVarCard
                name="BOOL_ONE"
                value={boolOne ? "true" : "false"}
                type="boolean"
                isSensitive={false}
                description="Boolean variable set to '1'"
              />

              <EnvVarCard
                name="NUM_VAR"
                value={numVar.toString()}
                type="number"
                isSensitive={false}
                description="Numeric variable"
              />

              <EnvVarCard
                name="JSON_VAR"
                value={JSON.stringify(jsonVar)}
                type="json"
                isSensitive={false}
                description="JSON variable"
              />

              <EnvVarCard
                name="INVALID_JSON"
                value={invalidJson ? "Invalid JSON" : "Valid JSON"}
                type="boolean"
                isSensitive={false}
                description="Invalid JSON variable test"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Hide Sensitive Values" : "Show All Values"}
        </Button>

        <Button variant="default" onClick={() => window.location.reload()}>
          Refresh Values
        </Button>
      </CardFooter>
    </Card>
  )
}

interface EnvVarCardProps {
  name: string
  value: string
  type: "string" | "number" | "boolean" | "json"
  isSensitive: boolean
  description: string
}

function EnvVarCard({ name, value, type, isSensitive, description }: EnvVarCardProps) {
  const [revealed, setRevealed] = useState(false)

  const getTypeColor = () => {
    switch (type) {
      case "string":
        return "bg-blue-100 text-blue-800"
      case "number":
        return "bg-green-100 text-green-800"
      case "boolean":
        return "bg-purple-100 text-purple-800"
      case "json":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const displayValue = () => {
    if (isSensitive && !revealed) {
      return "••••••••••••"
    }
    return value
  }

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <Badge className={getTypeColor()}>{type}</Badge>
      </div>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{displayValue()}</code>
        {isSensitive && (
          <Button variant="ghost" size="sm" onClick={() => setRevealed(!revealed)} className="text-xs">
            {revealed ? "Hide" : "Reveal"}
          </Button>
        )}
      </div>
    </div>
  )
}

interface FeatureFlagRowProps {
  name: string
  enabled: boolean
  description: string
}

function FeatureFlagRow({ name, enabled, description }: FeatureFlagRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        {enabled ? (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircleIcon className="h-3 w-3" />
            <span>Enabled</span>
          </Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <XCircleIcon className="h-3 w-3" />
            <span>Disabled</span>
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-sm text-gray-500">{description}</TableCell>
    </TableRow>
  )
}
