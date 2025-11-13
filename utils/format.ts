export function formatCurrency(amount: number, currency = "SGD"): string {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-SG").format(value)
}

export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date)
  }
  return new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function formatTime(durationInSeconds: number): string {
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = durationInSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}
