export type DashboardSettings = {
  darkMode?: boolean;
  cutoffTime?: string;
  afterHoursTime?: string;
  refreshIntervalSeconds?: number;
  tvMode?: boolean;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled";

export type QueueOrder = {
  id: string;
  customer?: string;
  status: OrderStatus;
};
