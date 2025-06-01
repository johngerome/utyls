import { describe, it, expect } from "vitest";
import { toFullDate } from "./toFullDate.js";

describe("toFullDate", () => {
  it("formats a date to full date format", () => {
    const date = "2023-01-01";
    const result = toFullDate(date);
    expect(result).toBe("Sunday, January 1, 2023");
  });

  it("handles different date formats", () => {
    expect(toFullDate("01/15/2023")).toBe("Sunday, January 15, 2023");
    expect(toFullDate("2023-02-14T12:00:00Z")).toBe(
      "Tuesday, February 14, 2023",
    );
  });

  it("handles date objects", () => {
    const dateObj = new Date("2023-03-20");
    expect(toFullDate(dateObj.toString())).toBe("Monday, March 20, 2023");
  });

  it("throws an error when given an invalid date string", () => {
    expect(() => toFullDate("not-a-date")).toThrow();
    expect(() => toFullDate("2023/13/45")).toThrow();
  });

  it("handles empty string input", () => {
    expect(() => toFullDate("")).toThrow();
  });

  it("handles null values", () => {
    // @ts-expect-error - Testing invalid input type
    const result = toFullDate(null);
    expect(result).toMatch(/Thursday, January 1, 1970/);
  });

  it("handles undefined values", () => {
    // @ts-expect-error - Testing invalid input type
    expect(() => toFullDate(undefined)).toThrow();
  });
});
