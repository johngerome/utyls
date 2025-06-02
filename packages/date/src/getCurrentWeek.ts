import { endOfWeek, startOfMonth, startOfWeek } from "date-fns";

/**
 * Gets the current week information relative to the current month.
 *
 * This function calculates the index of the current week within the month,
 * where the first week that contains the first day of the month has index 0.
 * It also provides the start and end dates of the current week.
 *
 * @returns An object containing the week index and date boundaries
 */
export function getCurrentWeek(): { index: number; start: Date; end: Date } {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const firstWeekStart = startOfWeek(monthStart);
  const currentWeekStart = startOfWeek(today);

  const weekIndex = Math.floor(
    (currentWeekStart.getTime() - firstWeekStart.getTime()) /
      (7 * 24 * 60 * 60 * 1000),
  );

  return {
    index: weekIndex,
    start: currentWeekStart,
    end: endOfWeek(today),
  };
}
