import type { DashboardPayload } from "./types";

const baseUrl = process.env.WOOCOMMERCE_URL!;
const consumerKey =
  process.env.WOOCOMMERCE_CONSUMER_KEY!;

const consumerSecret =
  process.env.WOOCOMMERCE_CONSUMER_SECRET!;

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
      throw new Error(
        "Failed to fetch WooCommerce orders"
      );
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

export async function getDashboardPayload(): Promise<DashboardPayload> {
  const orders = await fetchOrders();

  const now = new Date();

  const cutoffHour = 12;

  const currentHour = now.getHours();

  const currentMinute = now.getMinutes();

  const currentSecond = now.getSeconds();

  const secondsNow =
    currentHour * 3600 +
    currentMinute * 60 +
    currentSecond;

  const cutoffSeconds =
    cutoffHour * 3600;

  const countdownSeconds =
    Math.max(
      0,
      cutoffSeconds - secondsNow
    );

  const dashboardStatus =
  countdownSeconds > 0
    ? "OPEN"
    : "CUT OFF CLOSED";

  const todayOrders = orders.filter(
    (order: any) => {
      const orderDate = new Date(
        order.date_created
      );

      return (
        orderDate.toDateString() ===
        now.toDateString()
      );
    }
  );

  const monthOrders = orders.filter(
    (order: any) => {
      const orderDate = new Date(
        order.date_created
      );

      return (
        orderDate.getMonth() ===
          now.getMonth() &&
        orderDate.getFullYear() ===
          now.getFullYear()
      );
    }
  );

  const revenueToday =
    todayOrders.reduce(
      (sum: number, order: any) =>
        sum +
        Number(order.total ?? 0),
      0
    );

  const revenueThisMonth =
    monthOrders.reduce(
      (sum: number, order: any) =>
        sum +
        Number(order.total ?? 0),
      0
    );

  const completed = orders.filter(
    (o: any) =>
      o.status === "completed"
  ).length;

  const processing = orders.filter(
    (o: any) =>
      o.status === "processing"
  ).length;

  const averageOrderValue =
    revenueThisMonth /
    Math.max(1, monthOrders.length);

  const suspiciousOrders =
    orders.filter((order: any) => {
      const total = Number(
        order.total ?? 0
      );

      return (
        total >
        Math.max(
          averageOrderValue * 2,
          150
        )
      );
    });

  const productMap = new Map();

  orders.forEach((order: any) => {
    order.line_items?.forEach(
      (item: any) => {
        const existing =
          productMap.get(item.name) || {
            quantity: 0,
            revenue: 0
          };

        existing.quantity +=
          item.quantity || 0;

        existing.revenue +=
          Number(item.total || 0);

        productMap.set(
          item.name,
          existing
        );
      }
    );
  });

  const topProducts = Array.from(
    productMap.entries()
  )
    .map(([name, data]: any) => ({
      name,
      quantity: data.quantity,
      revenue: data.revenue
    }))
    .sort(
      (a, b) =>
        b.quantity - a.quantity
    )
    .slice(0, 5);

  return {
    generatedAt:
      new Date().toISOString(),

    status: dashboardStatus,

    countdownSeconds,

    settings: {
      cutoffTime: "12:00 PM",

      afterHoursTime: "8:00 PM",

      refreshIntervalSeconds: 60,

      tvMode: false,

      soundEnabled: true,

      dailyRevenueGoal: 10000,

      dailyOrderGoal: 100
    },

    kpis: {
      ordersToday:
        todayOrders.length,

      ordersThisMonth:
        monthOrders.length,

      revenueToday,

      revenueThisMonth,

      averageOrderValue:
        Math.round(
          averageOrderValue
        ),

      ordersInQueue:
        processing,

      rushOrdersPending: 0,

      ordersCompletedToday:
        completed
    },

    queue: orders
      .slice(0, 10)
      .map((order: any) => ({
        id: String(
          order.id ?? ""
        ),

        orderNumber: `#${
          order.number ??
          "Unknown"
        }`,

        customerName:
          `${
            order.billing
              ?.first_name ?? ""
          } ${
            order.billing
              ?.last_name ?? ""
          }`.trim() ||
          "Customer",

        orderType:
          "DTF Gang Sheet",

        status:
          order.status ===
          "completed"
            ? "Completed"
            : "Printing",

        createdAt:
          order.date_created ??
          new Date().toISOString(),

        estimatedCompletion:
          order.date_created ??
          new Date().toISOString(),

        rush: false,

        total: Number(
          order.total ?? 0
        ),

        itemCount:
          order.line_items
            ?.length ?? 0,

        assignedTo:
          "Production Team",

        source: "WooCommerce"
      })),

    charts: {
      revenueToday:
        todayOrders.map(
          (order: any) => ({
            label: new Date(
              order.date_created
            ).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric"
              }
            ),

            value: Number(
              order.total ?? 0
            )
          })
        ),

      ordersPerHour:
        Array.from(
          { length: 24 },
          (_, hour) => {
            const count =
              todayOrders.filter(
                (order: any) => {
                  const orderHour =
                    new Date(
                      order.date_created
                    ).getHours();

                  return (
                    orderHour ===
                    hour
                  );
                }
              ).length;

            return {
              label: `${hour}:00`,
              value: count
            };
          }
        ),

      throughput: [
        {
          label: "Completed",
          value: completed
        },

        {
          label: "Processing",
          value: processing
        }
      ],

      monthlySales:
        monthOrders.map(
          (order: any) => ({
            label: new Date(
              order.date_created
            ).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric"
              }
            ),

            value: Number(
              order.total ?? 0
            )
          })
        )
    },

    topProducts,

    printerUtilization: [
      {
        name: "Epson F2270",
        utilization:
          Math.min(
            100,
            processing * 8
          ),

        activeJob: `${processing} active`
      },

      {
        name: "Prestige XL2",
        utilization:
          Math.min(
            100,
            processing * 6
          ),

        activeJob: "Production"
      },

      {
        name: "DTF Station",
        utilization:
          Math.min(
            100,
            processing * 5
          ),

        activeJob: "Queue Ready"
      }
    ],

    completionPercentage:
      Math.round(
        (completed /
          Math.max(
            1,
            orders.length
          )) *
          100
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
