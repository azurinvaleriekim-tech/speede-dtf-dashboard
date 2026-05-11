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
  customer: string;
  status: string;
};
