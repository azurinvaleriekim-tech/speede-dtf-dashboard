export type ProductionStage =
  | "Awaiting Artwork"
  | "Ready to Print"
  | "Printing"
  | "Powdering"
  | "Curing"
  | "Cutting"
  | "Packing"
  | "Ready for Pickup"
  | "Shipped"
  | "Completed";

export type PrinterStatus = "Idle" | "Printing" | "Error" | "Maintenance";

export type ProductionOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  productType: string;
  gangSheetSize?: string;
  dueTime?: string;
  status: ProductionStage;
  rush: boolean;
  assignedPrinter?: string;
  assignedEmployee?: string;
  estimatedCompletion?: string;
  barcodeId?: string;
  wooOrderId?: number;
  notes?: string[];
  atRisk?: boolean;
};

export type PrinterDevice = {
  id: string;
  name: string;
  status: PrinterStatus;
  inkLevels?: {
    c: number;
    m: number;
    y: number;
    k: number;
    white: number;
  };
  temperature?: number;
  currentJob?: string;
  estimatedFinish?: string;
  utilization?: number;
  maintenanceWarnings?: string[];
};

export type EnterpriseKpis = {
  ordersToday: number;
  revenueToday: number;
  revenueThisMonth: number;
  ordersInQueue: number;
  rushOrders: number;
  ordersCompleted: number;
  averageTurnaroundMinutes?: number;
  pendingPickups?: number;
  failedOrders?: number;
  reprintCount?: number;
  productionCompletionPercent?: number;
};

export type EnterpriseDashboardPayload = {
  generatedAt: string;
  kpis: EnterpriseKpis;
  queue: ProductionOrder[];
  printers: PrinterDevice[];
};
