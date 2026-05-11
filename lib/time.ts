export function formatTime(date: string | number | Date) {
  return new Date(date).toLocaleTimeString();
}
export function formatDurationFrom(date: string | number | Date) {
  const diff = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000
  );

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}
