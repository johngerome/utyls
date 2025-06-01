import { describe, it, expect } from "vitest";
import { toFormalDate } from "./toFormalDate.js";

describe("toFormalDate", () => {
  it("formats a date to formal date format (d MMMM, yyyy)", () => {
    // Using a fixed date to ensure consistent test results
    const date = "2023-01-01";
    const result = toFormalDate(date);
    expect(result).toBe("1 January, 2023");
  });

  it("handles different date formats", () => {
    // Test with MM/DD/YYYY format
    expect(toFormalDate("01/15/2023")).toBe("15 January, 2023");

    // Test with ISO format
    expect(toFormalDate("2023-02-14T12:00:00Z")).toBe("14 February, 2023");

    // Test with date and time
    expect(toFormalDate("2023-03-20 10:15:30")).toBe("20 March, 2023");
  });

  it("handles date objects", () => {
    const dateObj = new Date("2023-04-25");
    // Pass the date object as a string
    expect(toFormalDate(dateObj.toString())).toBe("25 April, 2023");
  });

  it("correctly formats dates with single-digit days", () => {
    // Test with single-digit day
    expect(toFormalDate("2023-05-05")).toBe("5 May, 2023");
    expect(toFormalDate("2023-06-09")).toBe("9 June, 2023");

    // Test with double-digit day
    expect(toFormalDate("2023-07-10")).toBe("10 July, 2023");
    expect(toFormalDate("2023-08-21")).toBe("21 August, 2023");
  });
});
