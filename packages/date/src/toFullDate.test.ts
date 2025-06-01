import { describe, it, expect } from "vitest";
import { toFullDate } from "./toFullDate.js";

describe("toFullDate", () => {
  it("formats a date to full date format", () => {
    // Using a fixed date to ensure consistent test results
    const date = "2023-01-01";
    const result = toFullDate(date);
    expect(result).toBe("Sunday, January 1, 2023");
  });

  it("handles different date formats", () => {
    // Test with MM/DD/YYYY format
    expect(toFullDate("01/15/2023")).toBe("Sunday, January 15, 2023");

    // Test with ISO format
    expect(toFullDate("2023-02-14T12:00:00Z")).toBe(
      "Tuesday, February 14, 2023",
    );
  });

  it("handles date objects", () => {
    const dateObj = new Date("2023-03-20");
    // Pass the date object as a string
    expect(toFullDate(dateObj.toString())).toBe("Monday, March 20, 2023");
  });
});
