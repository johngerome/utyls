import { describe, it, expect, vi, beforeEach } from "vitest";
import { timeAgo } from "./timeAgo.js";
import { formatDistanceToNow, parseISO, parse, isValid } from "date-fns";

vi.mock("date-fns", () => ({
  formatDistanceToNow: vi.fn().mockReturnValue("2 hours ago"),
  parseISO: vi.fn((dateStr) => {
    if (dateStr === "not-a-date") {
      const invalidDate = new Date("invalid");
      return invalidDate;
    }
    return new Date(dateStr);
  }),
  parse: vi.fn((dateStr, _) => new Date(dateStr)),
  isValid: vi.fn((date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return true;
    }
    if (date instanceof Date && date.toString() === "Invalid Date") {
      return false;
    }
    return false;
  }),
}));

describe("timeAgo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return "No date" for falsy values', () => {
    // @ts-expect-error testing ts error
    expect(timeAgo(null)).toBe("No date");
    // @ts-expect-error testing ts error
    expect(timeAgo(undefined)).toBe("No date");
    expect(timeAgo("")).toBe("No date");
  });

  it('should return "Invalid date" for invalid date strings', () => {
    expect(timeAgo("not-a-date")).toBe("Invalid date");
  });

  it("should format a date string correctly", () => {
    const dateString = "2023-01-01T12:00:00Z";
    timeAgo(dateString);

    expect(parseISO).toHaveBeenCalledWith(dateString);

    expect(formatDistanceToNow).toHaveBeenCalledWith(expect.any(Date), {
      addSuffix: true,
    });
    expect(timeAgo(dateString)).toBe("2 hours ago");
  });

  it("should format a Date object correctly", () => {
    const dateObj = new Date("2023-01-01T12:00:00Z");
    timeAgo(dateObj);

    expect(isValid).toHaveBeenCalledWith(dateObj);
    expect(formatDistanceToNow).toHaveBeenCalledWith(expect.any(Date), {
      addSuffix: true,
    });
    expect(timeAgo(dateObj)).toBe("2 hours ago");
  });

  it('should return "Invalid date" for invalid Date objects', () => {
    const invalidDate = new Date("invalid");
    expect(timeAgo(invalidDate)).toBe("Invalid date");
    expect(isValid).toHaveBeenCalledWith(invalidDate);
  });

  it("should handle different date formats", () => {
    const isoString = "2023-01-01T12:00:00Z";
    const dateTimeString = "2023-01-01 12:00:00";
    timeAgo(isoString);
    expect(parseISO).toHaveBeenCalledWith(isoString);
    timeAgo(dateTimeString);
    expect(parseISO).toHaveBeenCalledWith(dateTimeString);
  });

  it("should use parse with format when parseFormat is provided", () => {
    const dateString = "01/02/2023";
    const format = "MM/dd/yyyy";

    timeAgo(dateString, format);

    expect(parse).toHaveBeenCalledWith(dateString, format, expect.any(Date));
    expect(formatDistanceToNow).toHaveBeenCalledWith(expect.any(Date), {
      addSuffix: true,
    });
    expect(timeAgo(dateString, format)).toBe("2 hours ago");
  });
});
