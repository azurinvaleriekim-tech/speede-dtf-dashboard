import type { ChartPoint, DashboardSettings, EmployeeMetric, PrinterMetric, ProductMetric, QueueOrder } from "./types";

const now = new Date();

function minutesAgo(minutes: number) {
  const date = new Date(now);
  date.setMinutes(date.getMinutes() - minutes);
  return date.toISOString();
}

function minutesFromNow(minutes: number) {
  const date = new Date(now);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}

export const settings: DashboardSettings = {
  cutoffTime: "15:00",
  afterHoursTime: "19:00",
  refreshIntervalSeconds: 60,
  tvMode: true,
  soundEnabled: true,
  dailyRevenueGoal: 8500,
  dailyOrderGoal: 90
};

export const queue: QueueOrder[] = [
  {
    id: "ord_1001",
    orderNumber: "DTF-10482",
    customerName: "Northline Athletics",
    orderType: "DTF Gang Sheet",
    status: "Printing",
    createdAt: minutesAgo(94),
    startedAt: minutesAgo(18),
    rush: true,
    estimatedCompletion: minutesFromNow(24),
    total: 486.5,
    itemCount: 12,
    assignedTo: "Mara",
    source: "WooCommerce"
  },
  {
    id: "ord_1002",
    orderNumber: "DTF-10483",
    customerName: "Bold Stitch Studio",
    orderType: "UV DTF",
    status: "Waiting",
    createdAt: minutesAgo(68),
    rush: false,
    estimatedCompletion: minutesFromNow(72),
    total: 218,
    itemCount: 5,
    assignedTo: "Jules",
    source: "Shopify"
  },
  {
    id: "ord_1003",
    orderNumber: "DTF-10484",
    customerName: "Kinetic Coffee Co.",
    orderType: "DTF Gang Sheet",
    status: "Waiting",
    createdAt: minutesAgo(52),
    rush: true,
    estimatedCompletion: minutesFromNow(48),
    total: 362.75,
    itemCount: 9,
    assignedTo: "Rae",
    source: "Drip Apps"
  },
  {
    id: "ord_1004",
    orderNumber: "DTF-10485",
    customerName: "Vista High Booster Club",
    orderType: "Sublimation",
    status: "Completed",
    createdAt: minutesAgo(140),
    startedAt: minutesAgo(102),
    completedAt: minutesAgo(36),
    rush: false,
    estimatedCompletion: minutesAgo(36),
    total: 680,
    itemCount: 31,
    assignedTo: "Noel",
    source: "Google Sheets"
  },
  {
    id: "ord_1005",
    orderNumber: "DTF-10486",
    customerName: "Metro Signs",
    orderType: "UV DTF",
    status: "Printing",
    createdAt: minutesAgo(44),
    startedAt: minutesAgo(8),
    rush: false,
    estimatedCompletion: minutesFromNow(34),
    total: 155.2,
    itemCount: 3,
    assignedTo: "Mara",
    source: "Manual"
  },
  {
    id: "ord_1006",
    orderNumber: "DTF-10487",
    customerName: "Oak & Iron Apparel",
    orderType: "Screen Print",
    status: "Waiting",
    createdAt: minutesAgo(21),
    rush: false,
    estimatedCompletion: minutesFromNow(96),
    total: 920,
    itemCount: 44,
    assignedTo: "Jules",
    source: "WooCommerce"
  },
  {
    id: "ord_1007",
    orderNumber: "DTF-10488",
    customerName: "Apex Gym",
    orderType: "DTF Gang Sheet",
    status: "Waiting",
    createdAt: minutesAgo(12),
    rush: true,
    estimatedCompletion: minutesFromNow(38),
    total: 274.9,
    itemCount: 7,
    assignedTo: "Rae",
    source: "Shopify"
  }
];

export const revenueToday: ChartPoint[] = [
  { label: "8a", value: 520 },
  { label: "9a", value: 1180 },
  { label: "10a", value: 1850 },
  { label: "11a", value: 2470 },
  { label: "12p", value: 3260 },
  { label: "1p", value: 4380 },
  { label: "2p", value: 5710 },
  { label: "3p", value: 6480 },
  { label: "4p", value: 7240 }
];

export const ordersPerHour: ChartPoint[] = [
  { label: "8a", value: 6 },
  { label: "9a", value: 12 },
  { label: "10a", value: 10 },
  { label: "11a", value: 14 },
  { label: "12p", value: 9 },
  { label: "1p", value: 16 },
  { label: "2p", value: 18 },
  { label: "3p", value: 11 }
];

export const throughput: ChartPoint[] = [
  { label: "Press 1", value: 82, secondary: 18 },
  { label: "Press 2", value: 74, secondary: 22 },
  { label: "UV", value: 68, secondary: 15 },
  { label: "Cut", value: 91, secondary: 31 },
  { label: "Pack", value: 76, secondary: 27 }
];

export const monthlySales: ChartPoint[] = [
  { label: "W1", value: 28300 },
  { label: "W2", value: 31800 },
  { label: "W3", value: 37100 },
  { label: "W4", value: 42900 }
];

export const topProducts: ProductMetric[] = [
  { name: "22x60 Gang Sheet", units: 146, revenue: 12410 },
  { name: "UV Logo Sheet", units: 88, revenue: 7320 },
  { name: "Rush Same-Day Print", units: 41, revenue: 5125 },
  { name: "Team Apparel Pack", units: 33, revenue: 9840 }
];

export const printerUtilization: PrinterMetric[] = [
  { name: "DTF Press 01", utilization: 91, activeJob: "DTF-10482" },
  { name: "DTF Press 02", utilization: 78, activeJob: "DTF-10486" },
  { name: "UV Station", utilization: 64, activeJob: "DTF-10483" },
  { name: "Finishing", utilization: 83, activeJob: "Batch 18" }
];

export const employeeLeaderboard: EmployeeMetric[] = [
  { name: "Mara", completed: 24, accuracy: 99.2 },
  { name: "Noel", completed: 21, accuracy: 98.8 },
  { name: "Jules", completed: 19, accuracy: 97.9 },
  { name: "Rae", completed: 18, accuracy: 99.5 }
];
