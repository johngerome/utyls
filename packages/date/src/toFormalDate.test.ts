import { describe, it, expect } from "vitest";
import { toFormalDate } from "./toFormalDate.js";

describe("toFormalDate", () => {
  it("formats a date to formal date format (d MMMM, yyyy)", () => {
    const date = "2023-01-01";
    const result = toFormalDate(date);
    expect(result).toBe("1 January, 2023");
  });

  it("handles different date formats", () => {
    expect(toFormalDate("01/15/2023")).toBe("15 January, 2023");
    expect(toFormalDate("2023-02-14T12:00:00Z")).toBe("14 February, 2023");
    expect(toFormalDate("2023-03-20 10:15:30")).toBe("20 March, 2023");
  });

  it("handles date objects", () => {
    const dateObj = new Date("2023-04-25T00:00:00Z");
    expect(toFormalDate(dateObj.toISOString())).toBe("25 April, 2023");
  });

  it("correctly formats dates with single-digit days", () => {
    expect(toFormalDate("2023-05-05")).toBe("5 May, 2023");
    expect(toFormalDate("2023-06-09")).toBe("9 June, 2023");
    expect(toFormalDate("2023-07-10")).toBe("10 July, 2023");
    expect(toFormalDate("2023-08-21")).toBe("21 August, 2023");
  });

  it("handles edge case dates correctly", () => {
    // Leap year date
    expect(toFormalDate("2024-02-29")).toBe("29 February, 2024");

    // Year boundary dates
    expect(toFormalDate("2023-12-31")).toBe("31 December, 2023");
    expect(toFormalDate("2024-01-01")).toBe("1 January, 2024");

    // Month with 30 days
    expect(toFormalDate("2023-04-30")).toBe("30 April, 2023");

    // Month with 31 days
    expect(toFormalDate("2023-07-31")).toBe("31 July, 2023");
  });

  it("throws an error when given an invalid date string", () => {
    // Test with completely invalid date string
    expect(() => toFormalDate("invalid-date")).toThrow();

    // Test with malformed date string
    expect(() => toFormalDate("2023/13/45")).toThrow();
  });

  it("handles empty string input", () => {
    expect(() => toFormalDate("")).toThrow();
  });

  it("handles null values", () => {
    // @ts-expect-error - Testing invalid input type
    const result = toFormalDate(null);
    expect(result).toMatch(/1 January, 1970/);
  });

  it("handles undefined values", () => {
    // @ts-expect-error - Testing invalid input type
    expect(() => toFormalDate(undefined)).toThrow();
  });
});
