import { format } from "date-fns";

/**
 * Formats a date to a full date format
 * @param date - Date string to format
 * @returns Formatted full date string e.g. Monday, January 1, 2023
 */
export function toFullDate(date: string) {
  return format(new Date(date), "EEEE, MMMM d, yyyy");
}
