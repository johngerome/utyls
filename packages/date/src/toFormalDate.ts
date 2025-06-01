import { format } from "date-fns";

export function toFormalDate(date: string) {
  return format(new Date(date), "d MMMM, yyyy");
}
