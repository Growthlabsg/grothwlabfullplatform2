/**
 * Utility to help debug image loading issues
 */
export function debugImageUrl(url: string): string {
  // Remove leading slash if present for consistency
  const cleanUrl = url.startsWith("/") ? url.substring(1) : url

  // Log the image URL being requested for debugging
  if (typeof window !== "undefined") {
    console.log(`Loading image: ${cleanUrl}`)
  }

  // Return the original URL with the leading slash
  return url.startsWith("/") ? url : `/${url}`
}

/**
 * Check if an image exists at the given path
 */
export async function checkImageExists(url: string): Promise<boolean> {
  if (typeof window === "undefined") return true

  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Failed to check image at ${url}:`, error)
    return false
  }
}
