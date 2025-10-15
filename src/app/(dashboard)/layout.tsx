import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;
  const fullname = user?.firstName + " " + user?.lastName;

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 overflow-scroll no-scrollbar">
        <Link href="/" className="w-4 h-4">
          <Image
            src="/schola_logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="w-auto h-auto object-cover"
            priority
          />
        </Link>
        <Menu role={role} />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar role={role} fullname={fullname} />
        {children}
      </div>
    </div>
  );
}
