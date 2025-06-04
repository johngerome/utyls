import { describe, it, expect } from "vitest";
import { error } from "./error.js";

describe("error", () => {
  it("should return an object", () => {
    const testError = new Error("Test error");
    const result = error(testError);
    expect(typeof result).toBe("object");
    expect(result).not.toBeNull();
  });

  it("should return an object with the correct error property", () => {
    const testError = new Error("Something went wrong");
    const result = error(testError);
    expect(result.error).toBe(testError);
    expect(result.error.message).toBe("Something went wrong");
  });

  it("should return an object with the data property set to null", () => {
    const testError = new Error("Another error");
    const result = error(testError);
    expect(result.data).toBeNull();
  });

  it("should handle a standard Error object", () => {
    const testError = new Error("Standard error message");
    const result = error(testError);
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error.message).toBe("Standard error message");
    expect(result.data).toBeNull();
  });

  class CustomError extends Error {
    constructor(
      message: string,
      public code: number,
    ) {
      super(message);
      this.name = "CustomError";
    }
  }

  it("should handle a custom Error object", () => {
    const testCustomError = new CustomError("Custom error with code", 123);
    const result = error(testCustomError);
    expect(result.error).toBeInstanceOf(CustomError);
    expect(result.error.message).toBe("Custom error with code");
    expect((result.error as CustomError).code).toBe(123);
    expect(result.data).toBeNull();
  });
});
