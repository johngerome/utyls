import type { Ok, ErrResult } from "./index.js";
import { ok, err } from "./index.js";

type Result<TOutput> = Ok<TOutput> | ErrResult;

export async function safe<TOutput>(
  promise: Promise<TOutput>,
): Promise<Result<TOutput>> {
  try {
    const output = await promise;
    return ok(output);
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}
