export type IntegrationLogEntry = {
  id: string;
  level: "info" | "warning" | "error";
  message: string;
  timestamp: string;
};
