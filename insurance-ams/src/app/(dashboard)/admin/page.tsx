// No "use client"

import CountChart from "@/Component/CountChart";
import UserCard from "@/Component/UserCard";
import ClientPipelineChart from "@/Component/ClientPipelineChart";
import InsuredLineChart from "@/Component/InsuredLineChart";
import EventCalendar from "@/Component/EventCalendar";
import Accouncement from "@/Component/Accouncement";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import {
  getQuotesInProgress,
  getOpenClaims,
  getPendingToBindPolicies,
  getLeads,
  getExpiringPolicies60days,
  getClaims,
} from "@/actions/dashboard.action";

const JWT_SECRET = process.env.JWT_SECRET || "plaintext_test_secret";

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role: string };
    if (payload.role !== Role.ADMIN) redirect("/login");
  } catch {
    redirect("/login");
  }

  const [leads, quotes, pending, expiring] = await Promise.all([
    getLeads(),
    getQuotesInProgress(),
    getPendingToBindPolicies(),
    getExpiringPolicies60days(60),
  ]);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Leads" amount={leads.length} />
          <UserCard type="Quoted" amount={quotes.length} />
          <UserCard type="Pending" amount={pending.length} />
          <UserCard type="Renewals" amount={expiring.length} />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <ClientPipelineChart />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <InsuredLineChart />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Accouncement />
      </div>
    </div>
  );
}


