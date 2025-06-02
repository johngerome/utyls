import { endOfMonth, setMonth, startOfMonth, startOfWeek } from "date-fns";

/**
 * Get total number of weeks in a specific month
 * @param monthIndex - The month index (0-11, where 0 is January)
 * @param year - The year (optional, defaults to current year)
 * @returns number of weeks in the month
 */
export function getTotalWeeksInMonth(
  monthIndex: number,
  year?: number,
): number {
  const currentYear = year ?? new Date().getFullYear();
  const monthDate = setMonth(new Date(currentYear, 0), monthIndex);

  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);

  const firstWeekStart = startOfWeek(monthStart);
  const lastWeekStart = startOfWeek(monthEnd);

  return (
    Math.floor(
      (lastWeekStart.getTime() - firstWeekStart.getTime()) /
        (7 * 24 * 60 * 60 * 1000),
    ) + 1
  );
}
