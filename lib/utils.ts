import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns singular or plural form of a word based on count
 * @param count - The number to check
 * @param singular - The singular form of the word
 * @param plural - The plural form of the word (optional, defaults to singular + 's')
 * @returns The appropriate form of the word
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string
): string {
  return count === 1 ? singular : plural || `${singular}s`;
}

/**
 * Formats a number with its singular/plural label
 * @param count - The number to display
 * @param singular - The singular form of the word
 * @param plural - The plural form of the word (optional)
 * @returns Formatted string like "1 like" or "5 likes"
 */
export function formatCount(
  count: number,
  singular: string,
  plural?: string
): string {
  return `${count} ${pluralize(count, singular, plural)}`;
}
