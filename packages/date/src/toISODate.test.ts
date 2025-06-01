import { describe, it, expect } from "vitest";
import { toISODate } from "./toISODate.js";

describe("toISODate", () => {
  it("formats a date to ISO format with timezone", () => {
    const date = "2023-01-01";
    const result = toISODate(date);
    expect(result).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );
    expect(result.substring(0, 10)).toBe("2023-01-01");
    expect(result.substring(0, 10)).toBe("2023-01-01");
  });

  it("handles different date formats", () => {
    const result1 = toISODate("01/15/2023");
    expect(result1.substring(0, 10)).toBe("2023-01-15");
    expect(result1).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );

    const result2 = toISODate("2023-02-14 12:30:00");
    expect(result2.substring(0, 10)).toBe("2023-02-14");
    expect(result2).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );
  });

  it("handles date objects", () => {
    const dateObj = new Date("2023-03-20T10:15:30Z");
    const result = toISODate(dateObj.toISOString());
    expect(result.substring(0, 10)).toBe("2023-03-20");
    expect(result).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );
  });

  it("handles edge case dates correctly", () => {
    // Leap year date
    const leapYearResult = toISODate("2024-02-29T00:00:00Z");
    expect(leapYearResult.substring(0, 10)).toBe("2024-02-29");
    expect(leapYearResult).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );

    // Year boundary date - use a time that won't cause timezone issues
    const yearBoundaryResult = toISODate("2023-12-31T12:00:00Z");
    expect(yearBoundaryResult.substring(0, 10)).toBe("2023-12-31");
    expect(yearBoundaryResult).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );

    // Month with 30 days
    const thirtyDayMonthResult = toISODate("2023-04-30T12:00:00Z");
    expect(thirtyDayMonthResult.substring(0, 10)).toBe("2023-04-30");

    // Month with 31 days
    const thirtyOneDayMonthResult = toISODate("2023-07-31T12:00:00Z");
    expect(thirtyOneDayMonthResult.substring(0, 10)).toBe("2023-07-31");
  });

  it("throws an error when given an invalid date string", () => {
    expect(() => toISODate("invalid-date")).toThrow();
    expect(() => toISODate("not-a-date")).toThrow();
    expect(() => toISODate("2023/13/45")).toThrow();
  });

  it("handles empty string input", () => {
    expect(() => toISODate("")).toThrow();
  });

  it("handles null values", () => {
    // @ts-expect-error - Testing invalid input type
    const result = toISODate(null);
    expect(result.substring(0, 10)).toBe("1970-01-01");
    expect(result).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );
  });

  it("handles undefined values", () => {
    // @ts-expect-error - Testing invalid input type
    expect(() => toISODate(undefined)).toThrow();
  });
});
