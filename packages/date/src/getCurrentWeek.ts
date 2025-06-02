import { endOfWeek, startOfMonth, startOfWeek } from "date-fns";

export function getCurrentWeek() {
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
