"use client";

import { Clock, RadioTower } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "./StatusBadge";
import type { BusinessStatus } from "../lib/types";

function formatCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => value.toString().padStart(2, "0")).join(":");
}

export function HeaderBar({
  status,
  countdownSeconds,
  cutoffTime,
  generatedAt
}: {
  status: BusinessStatus;
  countdownSeconds: number;
  cutoffTime: string;
  generatedAt: string;
}) {
  const [now, setNow] = useState(new Date());
  const [countdown, setCountdown] = useState(countdownSeconds);

  useEffect(() => {
    setCountdown(countdownSeconds);
  }, [countdownSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
      setCountdown((value) => Math.max(0, value - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
      }).format(now),
    [now]
  );

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan">Production Control</p>
        <h1 className="mt-2 text-3xl font-black tracking-0 text-white md:text-5xl">DTF Operations Dashboard</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="glass-panel rounded-lg px-5 py-4">
          <div className="flex items-center gap-3 text-white">
            <Clock className="text-cyan" size={22} />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/42">Now</p>
              <p className="text-lg font-bold tabular-nums">{dateLabel}</p>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-lg px-5 py-4">
          <p className="text-xs uppercase tracking-[0.18em] text-white/42">Cutoff {cutoffTime}</p>
          <p className="text-3xl font-black tabular-nums text-amber">{formatCountdown(countdown)}</p>
        </div>
        <div className="glass-panel rounded-lg px-5 py-4">
          <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/42">
            <RadioTower size={14} /> Live
          </p>
          <StatusBadge status={status} />
        </div>
        <p className="w-full text-right text-xs text-white/34">Last refresh {new Date(generatedAt).toLocaleTimeString()}</p>
      </div>
    </header>
  );
}
