import type { Ok, ErrResult } from "./index.js";
import { ok, error } from "./index.js";

type Result<TOutput> = Ok<TOutput> | ErrResult;

export async function safe<TOutput>(
  promise: Promise<TOutput>,
): Promise<Result<TOutput>> {
  try {
    const output = await promise;
    return ok(output);
  } catch (err) {
    return error(err instanceof Error ? err : new Error(String(err)));
  }
}
