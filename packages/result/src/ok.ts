export type Ok<TOutput> = {
  error: null;
  data: TOutput;
};

export function ok<T>(data: T): Ok<T> {
  return {
    error: null,
    data,
  };
}
