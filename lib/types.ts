export type DashboardSettings = {
  darkMode?: boolean;
  cutoffTime?: string;
  afterHoursTime?: string;
  refreshIntervalSeconds?: number;
  tvMode?: boolean;
  soundEnabled?: boolean;
  dailyRevenueGoal?: number;
  dailyOrderGoal?: number;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled";
export type BusinessStatus =
  | "open"
  | "busy"
  | "closing"
  | "closed";
export type DashboardPayload = {
  kpis: {
    revenueToday: number;
    ordersToday: number;
  };

  settings: {
    dailyRevenueGoal: number;
    dailyOrderGoal: number;
  };

  completionPercentage?: number;

  printerUtilization?: {
    name: string;
    utilization: number;
    activeJob: string;
  }[];

  employeeLeaderboard?: {
  name: string;
  orders: number;
  accuracy: number;
  completed: number;
}[];

  revenue?: number;
  orders?: number;
  goal?: number;
  throughput?: number;
};

export type QueueOrder = {
  id: string;
  orderNumber?: string;
  customerName?: string;
  orderType?: string;
  source?: string;
  assignedTo?: string;
  rush?: boolean;
  customer?: string;
  status: OrderStatus;
};

export type ChartPoint = {
  label: string;
  value: number;
};
