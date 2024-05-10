"use client";

import { UserData } from "@/types";
import avatar from "@/public/images/avatar.jpg";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

interface UserMenuProps {
  currentUser: UserData | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const logOut = async () => {
    try {
      await signOut();
      toast.success("Successfully logged out!");
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (currentUser) {
    return (
      <div className="flex h-full gap-2 items-center cursor-pointer relative">
        <div
          className="text-main-gray font-semibold group-hover:text-white uppercase hidden lg:flex"
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentUser.name}
        </div>
        <div
          className="rounded-full overflow-hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src={avatar} alt="avatar" height={30} width={30} />
        </div>
        {isOpen && (
          <div className="absolute right-0 top-12 flex flex-col bg-white w-[200px] border-solid border-l-[1px] border-r-[1px] border-b-[1px] border-[#EEEEEE]">
            {/* <span className="bg-white h-[16px] w-[16px] absolute right-[10px] -top-[4px] rotate-45"></span> */}
            <MenuItem
              title="My Reservations"
              style="text-main-gray px-4 py-2 hover:bg-[#EEEEEE]"
              onClick={() => {
                router.push("/reservations");
                setIsOpen(false);
              }}
            />
            <MenuItem
              title="My Account"
              style="text-main-gray px-4 py-2 hover:bg-[#EEEEEE]"
              onClick={() => {
                router.push("/account");
                setIsOpen(false);
              }}
            />
            <MenuItem
              title="Sign Out"
              onClick={() => logOut()}
              style="text-main-gray px-4 py-2 hover:bg-[#EEEEEE]"
            />
          </div>
        )}
      </div>
    );
  }
};

export default UserMenu;
