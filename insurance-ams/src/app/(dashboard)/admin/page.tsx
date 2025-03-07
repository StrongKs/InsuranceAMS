"use client";

import CountChart from "@/Component/CountChart";
import UserCard from "@/Component/UserCard";
import ClientPipelineChart from "@/Component/ClientPipelineChart";
import InsuredLineChart from "@/Component/InsuredLineChart";
import EventCalendar from "@/Component/EventCalendar";
import Accouncement from "@/Component/Accouncement";
import React, { useEffect, useState } from "react";

import {
  getQuotesInProgress,
  getOpenClaims,
  getPendingToBindPolicies,
  getLeads,
  getExpiringPolicies60days,
  getClaims,
} from "@/actions/dashboard.action";

const AdminPage = () => {
  const [leads, setLeads] = useState<number>(0);
  const [quotesInProgress, setQuotesInProgress] = useState<number>(0);
  const [pendingToBindPolicies, setPendingToBindPolicies] = useState<number>(0);
  const [expiringPolicies, setExpiringPolicies] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const leadsCount = await getLeads();
      setLeads(leadsCount.length);

      const quotesInProgressCount = await getQuotesInProgress();
      setQuotesInProgress((quotesInProgressCount as any[]).length);

      const pendingToBindPoliciesCount = await getPendingToBindPolicies();
      setPendingToBindPolicies((pendingToBindPoliciesCount as any[]).length);

      const expiringPoliciesCount = await getExpiringPolicies60days(60);
      setExpiringPolicies((expiringPoliciesCount as any[]).length);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* UserCards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Leads" amount={leads} />
          <UserCard type="Quoted" amount={quotesInProgress} />
          <UserCard type="Pending" amount={pendingToBindPolicies} />
          <UserCard type="Renewals" amount={expiringPolicies} />
        </div>
        {/* Middle Charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Policies Chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* Funnel Chart */}
          {/* Displays how many people progress down the funnel - shows where client was stopped. 
          Ex. client didnt progress through to signing so it ended there. 
          some end in signed and some end in no sign */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <ClientPipelineChart />
          </div>
        </div>
        {/* Bottom Charts */}
        <div className="w-full h-[500px]">
          <InsuredLineChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Accouncement />
      </div>
    </div>
  );
};

export default AdminPage;
