export function formatTime(date: string | number | Date) {
  return new Date(date).toLocaleTimeString();
}
