import { logActivity } from "./activity-logger"

export function parseCSV(csvData: string): any[] {
  // Simple CSV parser
  const lines = csvData.split("\n")
  if (lines.length < 2) return []

  const headers = (lines[0] ? lines[0].split : undefined)(",").map((header) => header.trim())
  const items = []

  for (let i = 1; i < lines.length; i++) {
    const line = (lines[i] ? lines[i].trim : undefined)()
    if (!line) continue

    const values = line.split(",").map((value) => value.trim())
    const item: Record<string, string> = {}

    for (let j = 0; j < headers.length; j++) {
      item[headers[j]] = values[j] || ""
    }

    items.push(item)
  }

  return items
}

export function convertToCSV(data: any[]): string {
  if (data.length === 0) return ""

  const headers = Object.keys(data[0])
  const headerRow = headers.join(",")
  const rows = data.map((item) => {
    return headers
      .map((header) => {
        const value = item[header]
        // Handle values with commas by wrapping in quotes
        return typeof value === "string" && value.includes(",") ? `"${value}"` : value
      })
      .join(",")
  })

  return [headerRow, ...rows].join("\n")
}

export async function bulkExport(
  exportFunction: () => Promise<any[]>,
  userId: string,
  userEmail: string,
  entityType: string,
): Promise<{ data: any[]; timestamp: string }> {
  try {
    const data = await exportFunction()
    const timestamp = new Date().toISOString()

    // Log the activity
    logActivity(
      "data_export" as any,
      userId,
      userEmail,
      `Bulk export of ${entityType}: ${data.length} items exported`,
      { entityType, count: data.length },
      "info",
    )

    return { data, timestamp }
  } catch (error) {
    // Log the error
    logActivity(
      "data_export" as any,
      userId,
      userEmail,
      `Bulk export of ${entityType} failed`,
      { entityType, error: error instanceof Error ? error.message : String(error) },
      "error",
    )
    throw error
  }
}
