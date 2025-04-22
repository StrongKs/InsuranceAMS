import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

import Dashboard from "@/Component/DashBoard";

import {
  getQuotesInProgress,
  getPendingToBindPolicies,
  getLeads,
  getExpiringPolicies60days,
  getCountChartData,
  getClientPipelineData,
  getInsuredLineData,
} from "@/actions/dashboard.admin.action";

const JWT_SECRET = process.env.JWT_SECRET || "plaintext_test_secret";

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: string };
    if (payload.role !== Role.ADMIN) redirect("/login");
  } catch {
    redirect("/login");
  }

  // Fetch all necessary data in parallel
  const [
    leads,
    quotes,
    pending,
    expiring,
    countChartData,
    clientPipelineData,
    insuredLineData,
  ] = await Promise.all([
    getLeads(),
    getQuotesInProgress(),
    getPendingToBindPolicies(),
    getExpiringPolicies60days(60),
    getCountChartData(), // Fetch data for CountChart
    getClientPipelineData(), // Fetch data for ClientPipelineChart
    getInsuredLineData(), // Fetch data for InsuredLineChart
  ]);

  // Consolidated user card data
  const userCardsData = {
    leads: leads.length,
    quotes: quotes.length,
    pending: pending.length,
    expiring: expiring.length,
  };

  return (
    <Dashboard
      userCardsData={userCardsData}
      role="ADMIN"
      countChartData={countChartData}
      clientPipelineData={clientPipelineData}
      insuredLineData={insuredLineData}
    />
  );
}
