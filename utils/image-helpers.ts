/**
 * Resolves image paths to ensure they work correctly in both development and production
 *
 * @param path The original image path
 * @returns The correctly formatted image path
 */
export function resolveImagePath(path: string): string {
  // If the path is already a full URL or data URL, return it as is
  if (path.startsWith("http") || path.startsWith("data:")) {
    return path
  }

  // If it's a placeholder SVG query, ensure it's correctly formatted
  if (path.includes("placeholder.svg")) {
    return path
  }

  // For public folder images, ensure they start with '/'
  if (!path.startsWith("/")) {
    return `/${path}`
  }

  return path
}

/**
 * Checks if an image exists in the public directory
 * Note: This only works in client components
 */
export async function checkImageExists(src: string): Promise<boolean> {
  try {
    const response = await fetch(src, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Failed to check image: ${src}`)
    return false
  }
}
