export type DashboardSettings = {
  darkMode?: boolean;
  cutoffTime?: string;
  afterHoursTime?: string;
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
