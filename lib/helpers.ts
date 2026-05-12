export function currency(value: number, currencyCode = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0
  }).format(value);
}

export function percent(value: number) {
  return `${Math.round(value)}%`;
}

export function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

export function safeDate(value?: string | number | Date) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export function minutesBetween(start: string | Date, end: string | Date = new Date()) {
  return Math.max(0, Math.round((safeDate(end).getTime() - safeDate(start).getTime()) / 60000));
}

export function toIso(value?: string | number | Date) {
  return safeDate(value).toISOString();
}
