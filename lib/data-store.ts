import type { DashboardPayload } from "./types";

const baseUrl = process.env.WOOCOMMERCE_URL!;
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY!;
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET!;

async function fetchOrders() {
  const now = new Date();

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  ).toISOString();

  let page = 1;

  let allOrders: any[] = [];

  while (true) {
    const response = await fetch(
      `${baseUrl}/wp-json/wc/v3/orders?per_page=100&page=${page}&after=${startOfMonth}`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${consumerKey}:${consumerSecret}`
            ).toString("base64")
        },
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch WooCommerce orders");
    }

    const batch = await response.json();

    if (!batch.length) {
      break;
    }

    allOrders = [...allOrders, ...batch];

    page++;
  }

  return allOrders;
}
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${consumerKey}:${consumerSecret}`
          ).toString("base64")
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch WooCommerce orders");
  }

  return response.json();
}

export async function getDashboardPayload(): Promise<DashboardPayload> {
  const orders = await fetchOrders();

  const now = new Date();

  const todayOrders = orders.filter((order: any) => {
    const orderDate = new Date(order.date_created);

    return (
      orderDate.toDateString() ===
      now.toDateString()
    );
  });

  const monthOrders = orders.filter((order: any) => {
    const orderDate = new Date(order.date_created);

    return (
      orderDate.getMonth() === now.getMonth() &&
      orderDate.getFullYear() === now.getFullYear()
    );
  });

  const revenueToday = todayOrders.reduce(
    (sum: number, order: any) =>
      sum + Number(order.total ?? 0),
    0
  );

  const revenueThisMonth = monthOrders.reduce(
    (sum: number, order: any) =>
      sum + Number(order.total ?? 0),
    0
  );

  const completed = orders.filter(
    (o: any) => o.status === "completed"
  ).length;

  const processing = orders.filter(
    (o: any) => o.status === "processing"
  ).length;

  const averageOrderValue =
    revenueThisMonth /
    Math.max(1, monthOrders.length);

  const suspiciousOrders = orders.filter(
    (order: any) => {
      const total = Number(order.total ?? 0);

      return total > Math.max(averageOrderValue * 2, 150);
    }
  );

  return {
    generatedAt: new Date().toISOString(),

    status: "OPEN",

    countdownSeconds: 0,

    settings: {
      cutoffTime: "5:00 PM",
      afterHoursTime: "8:00 PM",
      refreshIntervalSeconds: 60,
      tvMode: false,
      soundEnabled: true,
      dailyRevenueGoal: 10000,
      dailyOrderGoal: 100
    },

    kpis: {
      ordersToday: todayOrders.length,

      ordersThisMonth: monthOrders.length,

      revenueToday,

      revenueThisMonth,

      averageOrderValue: Math.round(
        averageOrderValue
      ),

      ordersInQueue: processing,

      rushOrdersPending: 0,

      ordersCompletedToday: completed
    },

    queue: orders.slice(0, 10).map((order: any) => ({
      id: String(order.id ?? ""),

      orderNumber: `#${order.number ?? "Unknown"}`,

      customerName:
        `${order.billing?.first_name ?? ""} ${
          order.billing?.last_name ?? ""
        }`.trim() || "Customer",

      orderType: "DTF Gang Sheet",

      status:
        order.status === "completed"
          ? "Completed"
          : "Printing",

      createdAt:
        order.date_created ??
        new Date().toISOString(),

      estimatedCompletion:
        order.date_created ??
        new Date().toISOString(),

      rush: false,

      total: Number(order.total ?? 0),

      itemCount:
        order.line_items?.length ?? 0,

      assignedTo: "Production Team",

      source: "WooCommerce"
    })),

    charts: {
      revenueToday: [],
      ordersPerHour: [],
      throughput: [],
      monthlySales: []
    },

    topProducts: [],

    printerUtilization: [],

    completionPercentage: Math.round(
      (completed / Math.max(1, orders.length)) * 100
    ),

    employeeLeaderboard: [],

    ticker: [
      `${orders.length} WooCommerce orders synced`,
      `${completed} completed orders`,
      `${processing} processing orders`,
      `${suspiciousOrders.length} suspicious high-value orders detected`
    ]
  };
}
