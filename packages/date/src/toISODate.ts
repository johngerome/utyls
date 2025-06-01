import { format } from "date-fns";

/**
 * Formats a date to ISO format with timezone
 * @param date - Date string to format
 * @returns Formatted ISO date string with timezone e.g. 2023-01-01T12:00:00Z
 */
export function toISODate(date: string) {
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm:ssxxx");
}
