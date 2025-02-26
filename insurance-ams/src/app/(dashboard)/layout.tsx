import Image from "next/image";
import Link from "next/link";
import Menu from "@/Component/Menu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* Left Side */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] cl:w-[14%] bg-red-200 p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          <span className="hidden lg:block">InsuranceAMS</span>
        </Link>
        <Menu />
      </div>
      {/* Right Side */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] cl:w-[86%] bg-blue-300">
        Right
      </div>
    </div>
  );
}
