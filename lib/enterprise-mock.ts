import type { EnterpriseDashboardPayload } from "./enterprise-types";
import { toIso } from "./helpers";

export const enterpriseMock: EnterpriseDashboardPayload = {
  generatedAt: toIso(),
  kpis: {
    ordersToday: 96,
    revenueToday: 7240,
    revenueThisMonth: 140100,
    ordersInQueue: 7,
    rushOrders: 3,
    ordersCompleted: 68,
    averageTurnaroundMinutes: 86,
    pendingPickups: 4,
    failedOrders: 2,
    reprintCount: 4,
    productionCompletionPercent: 91
  },
  queue: [
    {
      id: "prod_10482",
      orderNumber: "DTF-10482",
      customerName: "Northline Athletics",
      productType: "DTF Gang Sheet",
      gangSheetSize: "22x60",
      status: "Printing",
      rush: true,
      assignedPrinter: "Printer A",
      assignedEmployee: "Mara",
      barcodeId: "SPD-DTF-10482",
      atRisk: false
    },
    {
      id: "prod_10484",
      orderNumber: "DTF-10484",
      customerName: "Kinetic Coffee Co.",
      productType: "DTF Gang Sheet",
      gangSheetSize: "22x120",
      status: "Awaiting Artwork",
      rush: true,
      assignedPrinter: "Printer B",
      assignedEmployee: "Rae",
      barcodeId: "SPD-DTF-10484",
      atRisk: true
    }
  ],
  printers: [
    {
      id: "printer_a",
      name: "Printer A",
      status: "Printing",
      currentJob: "DTF-10482",
      utilization: 91,
      inkLevels: { c: 74, m: 68, y: 81, k: 63, w: 52 }
      maintenanceWarnings: []
    },
    {
      id: "printer_b",
      name: "Printer B",
      status: "Maintenance",
      currentJob: "DTF-10484",
      utilization: 74,
      inkLevels: { c: 48, m: 55, y: 61, k: 46, w: 38 },
      maintenanceWarnings: ["Daily head clean due"]
    }
  ]
};
