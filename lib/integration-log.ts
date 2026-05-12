export type IntegrationLogEntry = {
  id: string;

  level: "info" | "warning" | "error";

  message: string;

  detail?: string;

  orderId?: string;

  createdAt: string;

  timestamp?: string;
};
