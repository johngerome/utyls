import { format } from "date-fns";

export function toNamedDate(date: string) {
  return format(new Date(date), "d MMMM, yyyy");
}
