import CountChart from "@/Component/CountChart";
import UserCard from "@/Component/UserCard";
import ClientPipelineChart from "@/Component/ClientPipelineChart";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* UserCards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Leads" amount={323} />
          <UserCard type="Quoted" amount={99} />
          <UserCard type="Pending" amount={3} />
          <UserCard type="Renewals" amount={893} />
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
        <div className=""></div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3">R</div>
    </div>
  );
};

export default AdminPage;
