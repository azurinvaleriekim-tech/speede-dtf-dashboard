export type HeatmapPoint = {
  hour: string;
  orders: number;
};

export type PrinterAsset = {
  id: string;
  name: string;
  status: string;
};

export type ProductionOrder = {
  id: string;
  orderNumber?: string;
  customer: string;
  productType?: string;
  status: string;
  rush?: boolean;
  atRisk?: boolean;
};
