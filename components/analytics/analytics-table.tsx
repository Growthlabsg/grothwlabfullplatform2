"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import type { AnalyticsTableData } from "@/lib/analytics-service"

interface AnalyticsTableProps {
  table: AnalyticsTableData
  className?: string
}

export function AnalyticsTable({ table, className }: AnalyticsTableProps) {
  const { formatCurrency } = useLanguage()

  // Format cell value based on column format
  const formatCellValue = (value: any, format?: string) => {
    if (value === undefined || value === null) {
      return "-"
    }

    switch (format) {
      case "currency":
        return formatCurrency(value, "SGD")
      case "percentage":
        return `${value.toFixed(1)}%`
      case "date":
        return new Date(value).toLocaleDateString()
      default:
        return value
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{table.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {table.columns.map((column) => (
                  <TableHead key={column.id}>{column.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.rows.map((row, index) => (
                <TableRow key={index}>
                  {table.columns.map((column) => (
                    <TableCell key={column.id}>{formatCellValue(row[column.id], column.format)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
