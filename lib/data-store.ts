import {
  employeeLeaderboard,
  monthlySales,
  ordersPerHour,
  printerUtilization,
  queue,
  revenueToday,
  settings,
  throughput,
  topProducts
} from "./mock-data";
import { getBusinessStatus, getSecondsUntil } from "./time";
import type { DashboardPayload, DashboardSettings, QueueOrder } from "./types";

let mutableSettings: DashboardSettings = { ...settings };
let mutableQueue: QueueOrder[] = queue.map((order) => ({ ...order }));

export async function getSettings() {
  return mutableSettings;
}

export async function updateSettings(next: Partial<DashboardSettings>) {
  mutableSettings = { ...mutableSettings, ...next };
  return mutableSettings;
}

export async function getOrders() {
  return mutableQueue;
}

export async function createOrder(order: QueueOrder) {
  mutableQueue = [order, ...mutableQueue];
  return order;
}

export async function updateOrder(id: string, patch: Partial<QueueOrder>) {
  const index = mutableQueue.findIndex((order) => order.id === id);
  if (index === -1) return null;

  mutableQueue[index] = { ...mutableQueue[index], ...patch };
  return mutableQueue[index];
}

export async function getDashboardPayload(): Promise<DashboardPayload> {
  const now = new Date();
  const completedToday = mutableQueue.filter((order) => order.status === "Completed").length + 58;
  const queueOrders = mutableQueue.filter((order) => order.status !== "Completed");
  const revenueTodayTotal = revenueToday[revenueToday.length - 1].value;
  const ordersToday = ordersPerHour.reduce((sum, point) => sum + point.value, 0);

  return {
    generatedAt: now.toISOString(),
    status: getBusinessStatus(mutableSettings.cutoffTime, mutableSettings.afterHoursTime, now),
    countdownSeconds: getSecondsUntil(mutableSettings.cutoffTime, now),
    settings: mutableSettings,
    kpis: {
      ordersToday,
      ordersThisMonth: 1842,
      revenueToday: revenueTodayTotal,
      revenueThisMonth: monthlySales.reduce((sum, point) => sum + point.value, 0),
      averageOrderValue: Math.round(revenueTodayTotal / ordersToday),
      ordersInQueue: queueOrders.length,
      rushOrdersPending: queueOrders.filter((order) => order.rush).length,
      ordersCompletedToday: completedToday
    },
    queue: mutableQueue,
    charts: {
      revenueToday,
      ordersPerHour,
      throughput,
      monthlySales
    },
    topProducts,
    printerUtilization,
    completionPercentage: Math.round((completedToday / Math.max(1, ordersToday + queueOrders.length)) * 100),
    employeeLeaderboard,
    ticker: [
      "DTF-10488 rush order received from Apex Gym",
      "Press 01 running at 91% utilization",
      "Daily revenue goal is 85% complete",
      "Same-day cutoff approaching",
      "Packing station cleared 27 jobs this shift"
    ]
  };
}
