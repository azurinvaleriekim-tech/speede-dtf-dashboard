export type DashboardSettings = {
  darkMode?: boolean;
  cutoffTime?: string;
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
