"use client";

import useSWR from "swr";
import type { DashboardPayload } from "./types";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch dashboard data");
  return response.json();
};

export function useDashboard(refreshSeconds = 60) {
  return useSWR<DashboardPayload>("/api/dashboard", fetcher, {
    refreshInterval: refreshSeconds * 1000,
    revalidateOnFocus: false,
    keepPreviousData: true
  });
}
