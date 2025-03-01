import Image from "next/image";

const UserCard = ({ type, amount }: { type: string; amount: number }) => {
  return (
    <div className="rounded-2xl odd:bg-baseBlue even:bg-mainBlue p-4 flex-1 min-w-[130]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2/26/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{amount}</h1>
      <h2 className="text-sm font-medium text-gray-700">{type}</h2>
    </div>
  );
};

export default UserCard;
