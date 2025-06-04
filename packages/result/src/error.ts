export type ErrResult = {
  error: Error;
  data: null;
};

export function error(error: Error): ErrResult {
  return {
    error,
    data: null,
  };
}
