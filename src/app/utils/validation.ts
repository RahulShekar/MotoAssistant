export function isPhoneNumber(value: string) {
  const cleaned = value.replace(/[^0-9]/g, "");
  return cleaned.length >= 7 && cleaned.length <= 15;
}

export function isPositiveNumber(value: string) {
  if (value == null || value === "") return false;
  const n = Number(value);
  return !Number.isNaN(n) && n > 0;
}

export function isDateRangeValid(start?: string, end?: string) {
  if (!start || !end) return false;
  const s = new Date(start);
  const e = new Date(end);
  return s.getTime() <= e.getTime();
}
