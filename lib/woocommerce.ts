import type { QueueOrder } from "./types";

export type WooCommerceOrderSummary = {
  id: number;
  number: string;
  status: string;
  total: string;
  date_created?: string;
};

export type WooCommerceSyncResult = {
  configured: boolean;
  orders: QueueOrder[];
  error?: string;
};

export function isWooCommerceConfigured() {
  return Boolean(process.env.WOOCOMMERCE_URL && process.env.WOOCOMMERCE_KEY && process.env.WOOCOMMERCE_SECRET);
}

export async function fetchWooCommerceOrders(): Promise<WooCommerceSyncResult> {
  if (!isWooCommerceConfigured()) {
    return { configured: false, orders: [] };
  }

  return {
    configured: true,
    orders: []
  };
}
