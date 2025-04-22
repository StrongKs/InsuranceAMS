import CountChart from "@/Component/CountChart";
import UserCard from "@/Component/UserCard";
import ClientPipelineChart from "@/Component/ClientPipelineChart";
import InsuredLineChart from "@/Component/InsuredLineChart";
import EventCalendar from "@/Component/EventCalendar";
import Accouncement from "@/Component/Accouncement";

interface UserCardsData {
  leads: number;
  quotes: number;
  pending: number;
  expiring: number;
}

interface DashboardPageProps {
  userCardsData: UserCardsData;
  role: "ADMIN" | "AGENT";
  countChartData: any; // Replace 'any' with actual type if known
  clientPipelineData: any;
  insuredLineData: any;
}

export default function DashboardPage({
  userCardsData,
  role,
  countChartData,
  clientPipelineData,
  insuredLineData,
}: DashboardPageProps) {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Leads" amount={userCardsData.leads} />
          <UserCard type="Quoted" amount={userCardsData.quotes} />
          <UserCard type="Pending" amount={userCardsData.pending} />
          <UserCard type="Renewals" amount={userCardsData.expiring} />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart data={countChartData} />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <ClientPipelineChart data={clientPipelineData} />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <InsuredLineChart data={insuredLineData} />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Accouncement />
      </div>
    </div>
  );
}
