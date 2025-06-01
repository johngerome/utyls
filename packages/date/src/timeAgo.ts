import { formatDistanceToNow, isValid, parse, parseISO } from "date-fns";

/**
 * Formats a date into a relative time string (e.g., "2 hours ago", "5 minutes ago")
 * @param date - Date string or Date object to format
 * @param parseFormat - Optional format string for parsing date strings
 * @returns Formatted relative time string
 */
export function timeAgo(date: Date | string, parseFormat?: string): string {
  if (!date) return "No date";

  if (typeof date === "string") {
    const parsedDate = parseFormat
      ? parse(date, parseFormat, new Date())
      : parseISO(date);

    if (!isValid(parsedDate)) {
      return "Invalid date";
    }

    if (parseFormat) {
      return formatDistanceToNow(parsedDate, {
        addSuffix: true,
      });
    }

    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }

  if (isValid(date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return "Invalid date";
}
