import { describe, it, expect, vi, afterEach } from "vitest";
import { getCurrentWeek } from "./getCurrentWeek.js";
import { startOfWeek, endOfWeek, startOfMonth } from "date-fns";

describe("getCurrentWeek", () => {
  const originalDate = global.Date;

  afterEach(() => {
    global.Date = originalDate;
  });

  it("should return the correct week index, start and end dates", () => {
    const mockDate = new Date(2025, 5, 2);
    global.Date = vi.fn(() => mockDate) as any;

    const monthStart = startOfMonth(mockDate);
    const firstWeekStart = startOfWeek(monthStart);
    const currentWeekStart = startOfWeek(mockDate);
    const expectedWeekIndex = Math.floor(
      (currentWeekStart.getTime() - firstWeekStart.getTime()) /
        (7 * 24 * 60 * 60 * 1000),
    );

    const result = getCurrentWeek();

    expect(result).toEqual({
      index: expectedWeekIndex,
      start: currentWeekStart,
      end: endOfWeek(mockDate),
    });
  });

  it("should handle the first week of the month correctly", () => {
    const mockDate = new Date(2025, 5, 1);
    global.Date = vi.fn(() => mockDate) as any;

    const result = getCurrentWeek();

    expect(result.index).toBeLessThanOrEqual(1);
    expect(result.start).toEqual(startOfWeek(mockDate));
    expect(result.end).toEqual(endOfWeek(mockDate));
  });

  it("should handle the last week of the month correctly", () => {
    const mockDate = new Date(2025, 5, 30);
    global.Date = vi.fn(() => mockDate) as any;

    const result = getCurrentWeek();

    expect(result.start).toEqual(startOfWeek(mockDate));
    expect(result.end).toEqual(endOfWeek(mockDate));
  });

  it("should calculate week index correctly for middle of month", () => {
    const mockDate = new Date(2025, 5, 15);
    global.Date = vi.fn(() => mockDate) as any;

    const result = getCurrentWeek();

    const monthStart = startOfMonth(mockDate);
    const firstWeekStart = startOfWeek(monthStart);
    const currentWeekStart = startOfWeek(mockDate);
    const expectedWeekIndex = Math.floor(
      (currentWeekStart.getTime() - firstWeekStart.getTime()) /
        (7 * 24 * 60 * 60 * 1000),
    );

    expect(result.index).toBe(expectedWeekIndex);
  });

  it("should ensure consistency with date-fns functions", () => {
    const testDates = [
      new Date(2025, 0, 1),
      new Date(2025, 5, 15),
      new Date(2025, 11, 31),
    ];

    testDates.forEach((mockDate) => {
      global.Date = vi.fn(() => mockDate) as any;
      const result = getCurrentWeek();

      expect(result.start).toEqual(startOfWeek(mockDate));
      expect(result.end).toEqual(endOfWeek(mockDate));
      expect(result.end.getTime()).toBeGreaterThanOrEqual(
        result.start.getTime(),
      );
    });
  });

  it("should calculate the correct week index for different months", () => {
    const testCases = [
      { date: new Date(2025, 0, 15) },
      { date: new Date(2025, 3, 15) },
      { date: new Date(2025, 6, 15) },
      { date: new Date(2025, 9, 15) },
    ];

    testCases.forEach(({ date }) => {
      global.Date = vi.fn(() => date) as any;

      const result = getCurrentWeek();

      const monthStart = startOfMonth(date);
      const firstWeekStart = startOfWeek(monthStart);
      const currentWeekStart = startOfWeek(date);
      const expectedWeekIndex = Math.floor(
        (currentWeekStart.getTime() - firstWeekStart.getTime()) /
          (7 * 24 * 60 * 60 * 1000),
      );

      expect(result.index).toBe(expectedWeekIndex);
      expect(result.start).toEqual(startOfWeek(date));
      expect(result.end).toEqual(endOfWeek(date));
    });
  });
});
