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

export type ProductionOrder = {
  id: string;
  orderNumber: string;
  customer: string;
  productType: string;
  gangSheetSize: string;
  dueTime: string;
  status: ProductionStage;
  assignedPrinter: string;
  assignedEmployee: string;
  barcodeId: string;
  rush?: boolean;
  atRisk?: boolean;
  createdAt?: string;
  estimatedCompletion?: string;
};

export type PrinterAsset = {
  id: string;
  name: string;

  status: "Idle" | "Printing" | "Maintenance" | "Error";

  utilization: number;

  currentJob?: string;
  estimatedFinish?: string;

  inkLevels: {
    c: number;
    m: number;
    y: number;
    k: number;
    w: number;
  };

  maintenanceWarnings: string[];
};

export type HeatmapPoint = {
  day: string;
  hour: number;
  orders: number;
  bottleneckScore: number;
};
export type EnterpriseDashboardPayload = {
  generatedAt: string;

  websocketUrl?: string;

  kpis: {
    ordersToday: number;
    revenueToday: number;
    revenueThisMonth: number;
    ordersInQueue: number;
    rushOrders: number;
    ordersCompleted: number;
    averageTurnaroundMinutes: number;
    pendingPickups: number;
    failedOrders: number;
    reprintCount: number;
    productionCompletionPercent: number;
  };

  queue: ProductionOrder[];

  dueSoon?: ProductionOrder[];

  forecast?: {
  estimatedCompletionTime: string;
  projectedOrdersToday: number;

  busyHourPrediction: string;

  dailyVolumePrediction: number;

  materialUsageFeet: number;

  inkUsageMl: number;

  rushOrderProbability: number;

  staffingRecommendation: string;
};

printers: PrinterAsset[];

gangSheets?: {
  id: string;
  size: string;
  quantity: number;
  status: string;
}[];

employees?: {
  id: string;
  name: string;
  productivity: number;
  activeJobs: number;
}[];

heatmap?: HeatmapPoint[];
};
