export type ProductionStage =
  | "Awaiting Artwork"
  | "Ready to Print"
  | "Printing"
  | "Powdering"
  | "Curing"
  | "Cutting"
  | "Packing"
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
