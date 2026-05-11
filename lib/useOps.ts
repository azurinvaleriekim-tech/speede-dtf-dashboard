"use client";

import useSWR from "swr";
import type { OperatingSystemPayload } from "@/lib/enterprise-types";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch operations data");
  return response.json();
};

export function useOps(refreshSeconds = 60) {
  return useSWR<OperatingSystemPayload>("/api/ops", fetcher, {
    refreshInterval: refreshSeconds * 1000,
    revalidateOnFocus: false,
    keepPreviousData: true
  });
}
