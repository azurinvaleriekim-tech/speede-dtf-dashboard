export type IntegrationResult = {
  source: string;
  status: "connected" | "configured" | "missing_credentials";
  message: string;
  importedOrders: number;
};

function hasEnv(keys: string[]) {
  return keys.every((key) => Boolean(process.env[key]));
}

export async function syncWooCommerce(): Promise<IntegrationResult> {
  const configured = hasEnv(["WOOCOMMERCE_URL", "WOOCOMMERCE_KEY", "WOOCOMMERCE_SECRET"]);
  return {
    source: "WooCommerce",
    status: configured ? "configured" : "missing_credentials",
    message: configured ? "WooCommerce credentials detected. Replace stub with REST fetch." : "Set WooCommerce URL, key, and secret.",
    importedOrders: configured ? 0 : 0
  };
}

export async function syncShopify(): Promise<IntegrationResult> {
  const configured = hasEnv(["SHOPIFY_SHOP", "SHOPIFY_ACCESS_TOKEN"]);
  return {
    source: "Shopify",
    status: configured ? "configured" : "missing_credentials",
    message: configured ? "Shopify credentials detected. Replace stub with Admin API fetch." : "Set Shopify shop and access token.",
    importedOrders: configured ? 0 : 0
  };
}

export async function syncDripApps(): Promise<IntegrationResult> {
  const configured = hasEnv(["DRIP_APPS_API_URL", "DRIP_APPS_API_KEY"]);
  return {
    source: "Drip Apps",
    status: configured ? "configured" : "missing_credentials",
    message: configured ? "Drip Apps credentials detected. Confirm API contract before enabling import." : "Set Drip Apps API URL and key.",
    importedOrders: configured ? 0 : 0
  };
}

export async function syncGoogleSheets(): Promise<IntegrationResult> {
  const configured = hasEnv(["GOOGLE_SHEETS_ID", "GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_PRIVATE_KEY"]);
  return {
    source: "Google Sheets",
    status: configured ? "configured" : "missing_credentials",
    message: configured ? "Google Sheets fallback is ready for service account access." : "Set sheet ID and service account credentials.",
    importedOrders: configured ? 0 : 0
  };
}
