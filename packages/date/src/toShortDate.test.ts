import { describe, it, expect } from "vitest";
import { toShortDate } from "./toShortDate.js";

describe("toShortDate", () => {
  it("formats a date to short date format (MM/DD/YYYY)", () => {
    // Using a fixed date to ensure consistent test results
    const date = "2023-01-01";
    const result = toShortDate(date);
    expect(result).toBe("01/01/2023");
  });

  it("handles different date formats", () => {
    // Test with MM/DD/YYYY format already
    expect(toShortDate("01/15/2023")).toBe("01/15/2023");

    // Test with ISO format
    expect(toShortDate("2023-02-14T12:00:00Z")).toBe("02/14/2023");

    // Test with date and time
    expect(toShortDate("2023-03-20 10:15:30")).toBe("03/20/2023");
  });

  it("handles date objects", () => {
    const dateObj = new Date("2023-04-25");
    // Pass the date object as a string
    expect(toShortDate(dateObj.toString())).toBe("04/25/2023");
  });

  it("maintains consistent formatting for single-digit months and days", () => {
    // Test with single-digit month
    expect(toShortDate("2023-5-15")).toBe("05/15/2023");

    // Test with single-digit day
    expect(toShortDate("2023-10-5")).toBe("10/05/2023");

    // Test with both single-digit month and day
    expect(toShortDate("2023-6-7")).toBe("06/07/2023");
  });
});
