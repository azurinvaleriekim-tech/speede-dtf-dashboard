import type { BusinessStatus } from "./types";

function getCentralTimeDate() {
  return new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago"
    })
  );
}

export function getSecondsUntil(
  time: string,
  now = getCentralTimeDate()
) {
  const [hours, minutes] = time.split(":").map(Number);

  const target = new Date(now);

  target.setHours(hours, minutes, 0, 0);

  if (target.getTime() < now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  return Math.max(
    0,
    Math.floor((target.getTime() - now.getTime()) / 1000)
  );
}

export function getBusinessStatus(
  cutoffTime: string,
  afterHoursTime: string,
  now = getCentralTimeDate()
): BusinessStatus {
  const currentMinutes =
    now.getHours() * 60 + now.getMinutes();

  const [cutoffHour, cutoffMinute] =
    cutoffTime.split(":").map(Number);

  const [afterHour, afterMinute] =
    afterHoursTime.split(":").map(Number);

  const cutoffMinutes =
    cutoffHour * 60 + cutoffMinute;

  const afterHoursMinutes =
    afterHour * 60 + afterMinute;

  if (currentMinutes < cutoffMinutes) return "OPEN";

  if (currentMinutes < afterHoursMinutes)
    return "CUT OFF CLOSED";

  return "AFTER HOURS";
}

export function formatDurationFrom(
  date: string,
  now = getCentralTimeDate()
) {
  const diff = Math.max(
    0,
    now.getTime() - new Date(date).getTime()
  );

  const minutes = Math.floor(diff / 60000);

  const hours = Math.floor(minutes / 60);

  const remainingMinutes = minutes % 60;

  if (hours <= 0) return `${remainingMinutes}m`;

  return `${hours}h ${remainingMinutes}m`;
}
