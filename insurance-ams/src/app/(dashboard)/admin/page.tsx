import UserCard from "@/Component/UserCard";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      {/* UserCards */}
      <div className="w-full lg:w-2/3">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="Leads" amount={323} />
          <UserCard type="Quoted" amount={99} />
          <UserCard type="Pending" amount={3} />
          <UserCard type="Renewals" amount={893} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3">R</div>
    </div>
  );
};

export default AdminPage;
