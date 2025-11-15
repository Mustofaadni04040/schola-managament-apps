import { UserButton } from "@clerk/nextjs";

const Navbar = async ({
  role,
  fullname,
}: {
  role: string;
  fullname: string;
}) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">
            {fullname !== "null null" ? fullname : role}
          </span>
          <span className="text-[10px] text-gray-500 text-right">{role}</span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
