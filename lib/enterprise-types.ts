export type HeatmapPoint = {
  day: string;
  hour: string;
  orders: number;
  bottleneckScore: number;
};

export type PrinterAsset = {
  id: string;
  name: string;
  status: string;
  currentJob?: string;
  estimatedFinish?: string;
  utilization?: number;
  inkLevels?: Record<string, number>;
  maintenanceWarnings?: string[];
};

export type ProductionOrder = {
  id: string;
  orderNumber?: string;
  customer: string;
  productType?: string;
  gangSheetSize?: string;
  dueTime?: string;
  assignedPrinter?: string;
  assignedEmployee?: string;
  barcodeId?: string;
  status: string;
  rush?: boolean;
  atRisk?: boolean;
};
