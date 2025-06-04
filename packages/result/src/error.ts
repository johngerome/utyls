export type ErrResult = {
  error: Error;
  data: null;
};

export function err(error: Error): ErrResult {
  return {
    error,
    data: null,
  };
}
