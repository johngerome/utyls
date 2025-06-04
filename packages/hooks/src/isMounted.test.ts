import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsMounted } from "./isMounted";

describe("useIsMounted", () => {
  it("should return true when the component is mounted", () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current.isMounted).toBe(true);
  });
});
