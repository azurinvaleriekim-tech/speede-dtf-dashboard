export type BusinessStatus = "OPEN" | "CUT OFF CLOSED" | "AFTER HOURS";

export type OrderStatus = "Waiting" | "Printing" | "Completed";

export type OrderType = "DTF Gang Sheet" | "UV DTF" | "Sublimation" | "Screen Print" | "Embroidery";

export type QueueOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  orderType: OrderType;
  status: OrderStatus;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  rush: boolean;
  estimatedCompletion: string;
  total: number;
  itemCount: number;
  assignedTo?: string;
  source: "WooCommerce" | "Shopify" | "Drip Apps" | "Google Sheets" | "Manual";
};

export type DashboardSettings = {
  cutoffTime: string;
  afterHoursTime: string;
  refreshIntervalSeconds: number;
  tvMode: boolean;
  soundEnabled: boolean;
  dailyRevenueGoal: number;
  dailyOrderGoal: number;
};

export type KpiSet = {
  ordersToday: number;
  ordersThisMonth: number;
  revenueToday: number;
  revenueThisMonth: number;
  averageOrderValue: number;
  ordersInQueue: number;
  rushOrdersPending: number;
  ordersCompletedToday: number;
};

export type DashboardPayload = {
  generatedAt: string;
  status: BusinessStatus;
  countdownSeconds: number;
  settings: DashboardSettings;
  kpis: KpiSet;
  queue: QueueOrder[];
  charts: {
    revenueToday: ChartPoint[];
    ordersPerHour: ChartPoint[];
    throughput: ChartPoint[];
    monthlySales: ChartPoint[];
  };
  topProducts: ProductMetric[];
  printerUtilization: PrinterMetric[];
  completionPercentage: number;
  employeeLeaderboard: EmployeeMetric[];
  ticker: string[];
};

export type ChartPoint = {
  label: string;
  value: number;
  secondary?: number;
};

export type ProductMetric = {
  name: string;
  units: number;
  revenue: number;
};

export type PrinterMetric = {
  name: string;
  utilization: number;
  activeJob: string;
};

export type EmployeeMetric = {
  name: string;
  completed: number;
  accuracy: number;
};
