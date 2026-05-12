import { NextResponse } from "next/server";
import { getDashboardPayload } from "../../../lib/data-store";

export async function GET() {
  const payload = await getDashboardPayload();
  return NextResponse.json(payload);
}
