import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

import DashboardPage from "@/Component/Dashboard";

import {
  getLeads,
  getQuotesInProgress,
  getPendingToBindPolicies,
  getExpiringPolicies60days,
  getCountChartData,
  getClientPipelineData,
  getInsuredLineData,
} from "@/actions/dashboard.agent.action";

const JWT_SECRET = process.env.JWT_SECRET || "plaintext_test_secret";

export default async function AgentPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  let agentId: string;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      role: string;
      userId: string;
    };
    if (payload.role !== Role.AGENT) redirect("/login");
    agentId = payload.userId; // you MUST have userId in your JWT payload
  } catch {
    redirect("/login");
  }

  const [
    leads,
    quotes,
    pending,
    expiring,
    countChartData,
    clientPipelineData,
    insuredLineData,
  ] = await Promise.all([
    getLeads(agentId),
    getQuotesInProgress(agentId),
    getPendingToBindPolicies(agentId),
    getExpiringPolicies60days(agentId, 60),
    getCountChartData(agentId),
    getClientPipelineData(agentId),
    getInsuredLineData(agentId),
  ]);

  const userCardsData = {
    leads: leads.length,
    quotes: quotes.length,
    pending: pending.length,
    expiring: expiring.length,
  };

  return (
    <DashboardPage
      userCardsData={userCardsData}
      role="AGENT"
      countChartData={countChartData}
      clientPipelineData={clientPipelineData}
      insuredLineData={insuredLineData}
    />
  );
}
