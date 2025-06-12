export type ErrResult = {
  error: Error;
  data: null;
  details?: unknown;
};

export function error(error: Error, details?: unknown): ErrResult {
  return {
    error,
    data: null,
    details,
  };
}
