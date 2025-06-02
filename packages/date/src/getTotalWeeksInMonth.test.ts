import { describe, it, expect } from "vitest";
import { getTotalWeeksInMonth } from "./getTotalWeeksInMonth.js";
import { endOfMonth, setMonth, startOfMonth, startOfWeek } from "date-fns";

describe("getTotalWeeksInMonth", () => {
  it("should calculate the correct number of weeks for different months", () => {
    const testCases = [
      { month: 0, year: 2025, expected: 5 }, // January 2025
      { month: 1, year: 2025, expected: 5 }, // February 2025
      { month: 2, year: 2025, expected: 6 }, // March 2025
      { month: 3, year: 2025, expected: 5 }, // April 2025
      { month: 4, year: 2025, expected: 5 }, // May 2025
      { month: 5, year: 2025, expected: 5 }, // June 2025
      { month: 6, year: 2025, expected: 5 }, // July 2025
      { month: 7, year: 2025, expected: 6 }, // August 2025
      { month: 8, year: 2025, expected: 5 }, // September 2025
      { month: 9, year: 2025, expected: 5 }, // October 2025
      { month: 10, year: 2025, expected: 6 }, // November 2025
      { month: 11, year: 2025, expected: 5 }, // December 2025
    ];

    testCases.forEach(({ month, year, expected }) => {
      const result = getTotalWeeksInMonth(month, year);
      expect(result).toBe(expected);
    });
  });

  it("should handle months with partial weeks correctly", () => {
    // February 2024 is a leap year with 29 days
    const result = getTotalWeeksInMonth(1, 2024);
    expect(result).toBe(5);

    // Testing months that span 6 weeks
    const sixWeekMonths = [
      { month: 11, year: 2023, expected: 6 }, // December 2023
      { month: 2, year: 2024, expected: 6 }, // March 2024
    ];

    sixWeekMonths.forEach(({ month, year, expected }) => {
      const result = getTotalWeeksInMonth(month, year);
      expect(result).toBe(expected);
    });
  });

  it("should calculate weeks correctly for months with different starting days", () => {
    // Testing months that start on different days of the week
    const testCases = [
      { month: 8, year: 2024, expected: 5 }, // September 2024 starts on Sunday
      { month: 3, year: 2024, expected: 5 }, // April 2024 starts on Monday
      { month: 9, year: 2023, expected: 5 }, // October 2023 starts on Sunday
    ];

    testCases.forEach(({ month, year, expected }) => {
      const result = getTotalWeeksInMonth(month, year);
      expect(result).toBe(expected);
    });
  });

  it("should use the current year when year is not provided", () => {
    const currentYear = new Date().getFullYear();
    const monthIndex = 5; // June
    const expectedResult = getTotalWeeksInMonth(monthIndex, currentYear);
    const result = getTotalWeeksInMonth(monthIndex);

    expect(result).toBe(expectedResult);
  });

  it("should handle edge cases correctly", () => {
    const januaryResult = getTotalWeeksInMonth(0, 2023);
    const decemberResult = getTotalWeeksInMonth(11, 2023);

    expect(januaryResult).toBeGreaterThanOrEqual(4);
    expect(januaryResult).toBeLessThanOrEqual(6);
    expect(decemberResult).toBeGreaterThanOrEqual(4);
    expect(decemberResult).toBeLessThanOrEqual(6);
  });
});
