import { describe, it, expect, vi, beforeEach } from "vitest";
import { getMonthToday } from "./getMonthToday.js";

describe("getMonthToday", () => {
  const RealDate = global.Date;

  beforeEach(() => {
    vi.clearAllMocks();
    global.Date = RealDate;
  });

  it("should return the correct month properties", () => {
    const mockDate = new Date(2025, 5, 2);
    global.Date = vi.fn(() => mockDate) as unknown as typeof Date;

    const result = getMonthToday();

    expect(result.index).toBe(5);
    expect(result.short).toBe("Jun");
    expect(result.long).toBe("June");
  });

  it("should handle different locales correctly", () => {
    const mockDate = new Date(2025, 3, 10);
    global.Date = vi.fn(() => mockDate) as unknown as typeof Date;

    const toLocaleStringSpy = vi.spyOn(mockDate, "toLocaleString");
    toLocaleStringSpy.mockImplementation((locale, options) => {
      if (options?.month === "short") return "Apr";
      if (options?.month === "long") return "April";
      return "";
    });

    const result = getMonthToday();

    expect(result.index).toBe(3);
    expect(result.short).toBe("Apr");
    expect(result.long).toBe("April");
    expect(mockDate.toLocaleString).toHaveBeenCalledWith("default", {
      month: "short",
    });
    expect(mockDate.toLocaleString).toHaveBeenCalledWith("default", {
      month: "long",
    });
  });

  it("should handle invalid Date object", () => {
    const invalidDate = new Date("invalid");
    global.Date = vi.fn(() => invalidDate) as unknown as typeof Date;

    const result = getMonthToday();

    expect(result.index).toBe(NaN);
    expect(typeof result.short).toBe("string");
    expect(typeof result.long).toBe("string");
  });
});
