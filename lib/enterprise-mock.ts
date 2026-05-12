import type { EnterpriseDashboardPayload } from "./enterprise-types";
import { toIso } from "./helpers";

export const enterpriseMock: EnterpriseDashboardPayload = {
  generatedAt: toIso(),

  websocketUrl: "wss://example.com/live",

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
      customer: "Northline Athletics",
      productType: "DTF Gang Sheet",
      gangSheetSize: "22x60",
      dueTime: toIso(),
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
      customer: "Kinetic Coffee Co.",
      productType: "DTF Gang Sheet",
      gangSheetSize: "22x120",
      dueTime: toIso(),
      status: "Awaiting Artwork",
      rush: true,
      assignedPrinter: "Printer B",
      assignedEmployee: "Rae",
      barcodeId: "SPD-DTF-10484",
      atRisk: true
    }
  ],

  dueSoon: [],

  forecast: {
    estimatedCompletionTime: "6:30 PM",
    projectedOrdersToday: 112,
    busyHourPrediction: "2 PM - 4 PM",
    dailyVolumePrediction: 140,
    materialUsageFeet: 820,
    inkUsageMl: 410,
    rushOrderProbability: 72,
    staffingRecommendation: "Add 1 packing staff"
  },

  printers: [
    {
      id: "printer_a",
      name: "Printer A",
      status: "Printing",
      currentJob: "DTF-10482",
      utilization: 91,
      inkLevels: { c: 74, m: 68, y: 81, k: 63, w: 52 },
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
  ],

  gangSheets: [
    {
      id: "batch_1",
      size: "22x60",
      dueWindow: "2 PM",
      orderCount: 6,
      rushCount: 2,
      assignedPrinter: "Printer A",
      wastePercent: 8,
      wasteReduction: 12,
      sequence: ["DTF-10482", "DTF-10483"],
      completionPercent: 74
    }
  ],

  employees: [
    {
      id: "emp_1",
      name: "Mara",
      role: "Printer Operator",
      activeTask: "Running Printer A",
      completedToday: 28,
      averageSpeedMinutes: 14,
      errorRate: 1.2
    }
  ],

  bottlenecks: [
    {
      stage: "Printing",
      severity: "warning",
      message: "Production delay detected",
      affectedOrders: 3
    }
  ],

  notifications: [
    {
      id: "notif_1",
      type: "warning",
      message: "Printer B maintenance required",
      createdAt: toIso()
    }
  ],

  heatmap: [
    {
      day: "Mon",
      hour: 10,
      orders: 14,
      bottleneckScore: 28
    }
  ]
};
