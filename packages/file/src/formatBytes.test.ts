import { describe, it, expect } from "vitest";
import { bytesToSize } from "./formatBytes.js";

describe("bytesToSize", () => {
  it('should return "0 Bytes" when bytes is 0', () => {
    expect(bytesToSize(0)).toBe("0 Bytes");
  });

  it("should format bytes correctly with default decimal places (2)", () => {
    expect(bytesToSize(1024)).toBe("1 KB");
    expect(bytesToSize(1536)).toBe("1.5 KB");
    expect(bytesToSize(1048576)).toBe("1 MB");
    expect(bytesToSize(1073741824)).toBe("1 GB");
    expect(bytesToSize(1099511627776)).toBe("1 TB");
  });

  it("should respect the decimals parameter", () => {
    expect(bytesToSize(1536, 0)).toBe("2 KB");
    expect(bytesToSize(1536, 1)).toBe("1.5 KB");
    expect(bytesToSize(1536, 3)).toBe("1.5 KB");
    expect(bytesToSize(1500, 0)).toBe("1 KB");
    expect(bytesToSize(1500, 1)).toBe("1.5 KB");
    expect(bytesToSize(1500, 2)).toBe("1.46 KB");
    expect(bytesToSize(1500, 3)).toBe("1.465 KB");
  });

  it("should handle negative decimals by using 0 decimals", () => {
    expect(bytesToSize(1500, -1)).toBe("1 KB");
  });

  it("should handle large values", () => {
    // 1 PB (petabyte)
    expect(bytesToSize(1125899906842624)).toBe("1 PB");
    // 1 EB (exabyte)
    expect(bytesToSize(1024 ** 6)).toBe("1 EB");
  });

  it("should handle fractional bytes", () => {
    expect(bytesToSize(0.5)).toBe("0.5 Bytes");
  });

  it("should handle extremely large values beyond YB", () => {
    const extremelyLargeValue = Math.pow(1024, 10); // Beyond YB
    expect(bytesToSize(extremelyLargeValue)).toContain("YB");
  });
});
