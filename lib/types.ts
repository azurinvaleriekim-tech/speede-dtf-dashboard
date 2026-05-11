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

export type QueueOrder = {
  id: string;
  orderNumber?: string;
  customerName?: string;
  orderType?: string;
  source?: string;
  assignedTo?: string;
  customer?: string;
  status: OrderStatus;
};
