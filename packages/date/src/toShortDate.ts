import { format } from "date-fns";

/**
 * Formats a date to a short date format
 * @param date - Date string to format
 * @returns Formatted short date string e.g. 01/02/2023
 */
export function toShortDate(date: string) {
  return format(new Date(date), "MM/dd/yyyy");
}
