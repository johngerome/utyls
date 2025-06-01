import { describe, it, expect } from "vitest";
import { toISODate } from "./toISODate.js";

describe("toISODate", () => {
  it("formats a date to ISO format with timezone", () => {
    // Using a fixed date to ensure consistent test results
    // Note: The timezone in the result will depend on the system's timezone
    // For this test, we'll check the date part and format structure
    const date = "2023-01-01";
    const result = toISODate(date);

    // Verify the format matches ISO pattern (YYYY-MM-DDTHH:mm:ss+/-HH:mm)
    expect(result).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );

    // Verify the date part is correct
    expect(result.substring(0, 10)).toBe("2023-01-01");
  });

  it("handles different date formats", () => {
    // Test with MM/DD/YYYY format
    const result1 = toISODate("01/15/2023");
    expect(result1.substring(0, 10)).toBe("2023-01-15");
    expect(result1).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );

    // Test with date and time
    const result2 = toISODate("2023-02-14 12:30:00");
    expect(result2.substring(0, 10)).toBe("2023-02-14");
    expect(result2).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );
  });

  it("handles date objects", () => {
    const dateObj = new Date("2023-03-20T10:15:30Z");
    const result = toISODate(dateObj.toString());

    // Verify the date part is correct
    expect(result.substring(0, 10)).toBe("2023-03-20");
    expect(result).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
    );
  });
});
