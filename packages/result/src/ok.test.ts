import { describe, it, expect } from "vitest";
import { ok } from "./ok.js";

describe("ok", () => {
  it("should return an object", () => {
    const result = ok("test");
    expect(typeof result).toBe("object");
    expect(result).not.toBeNull();
  });

  it("should return an object with the correct data property", () => {
    const testData = "hello world";
    const result = ok(testData);
    expect(result.data).toBe(testData);
  });

  it("should return an object with the error property set to null", () => {
    const result = ok("any data");
    expect(result.error).toBeNull();
  });

  it("should handle number data type", () => {
    const testData = 123;
    const result = ok(testData);
    expect(result.data).toBe(testData);
    expect(result.error).toBeNull();
  });

  it("should handle string data type", () => {
    const testData = "vitest";
    const result = ok(testData);
    expect(result.data).toBe(testData);
    expect(result.error).toBeNull();
  });

  it("should handle boolean true data type", () => {
    const testData = true;
    const result = ok(testData);
    expect(result.data).toBe(testData);
    expect(result.error).toBeNull();
  });

  it("should handle boolean false data type", () => {
    const testData = false;
    const result = ok(testData);
    expect(result.data).toBe(testData);
    expect(result.error).toBeNull();
  });

  it("should handle null data type", () => {
    const testData = null;
    const result = ok(testData);
    expect(result.data).toBe(testData);
    expect(result.error).toBeNull();
  });

  it("should handle undefined data type", () => {
    const testData = undefined;
    const result = ok(testData);
    expect(result.data).toBe(testData);
    expect(result.error).toBeNull();
  });

  it("should handle object data type", () => {
    const testData = { key: "value", count: 42 };
    const result = ok(testData);
    expect(result.data).toEqual(testData); // Use toEqual for deep equality for objects
    expect(result.error).toBeNull();
  });

  it("should handle array data type", () => {
    const testData = [1, "two", { three: 3 }];
    const result = ok(testData);
    expect(result.data).toEqual(testData); // Use toEqual for deep equality for arrays
    expect(result.error).toBeNull();
  });
});
