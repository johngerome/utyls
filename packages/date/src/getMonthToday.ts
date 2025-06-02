export function getMonthToday() {
  const date = new Date();

  return {
    index: date.getMonth(),
    short: date.toLocaleString("default", { month: "short" }),
    long: date.toLocaleString("default", { month: "long" }),
  };
}
