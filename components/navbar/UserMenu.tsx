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

  if (!currentUser) {
    return <div></div>;
  }

  const logOut = async () => {
    await signOut()
      .then(() => toast.success("Successfully logged out!"))
      .then(() => router.push("/"))
      .catch((error) => console.error(error));
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
          <div className="absolute right-0 top-14 flex flex-col gap-4 bg-white px-4 py-2 rounded-lg w-[300px]">
            <span className="bg-white h-[16px] w-[16px] absolute right-[10px] -top-[4px] rotate-45"></span>
            <MenuItem
              title="My Reservations"
              style="text-main-gray"
              onClick={() => router.push("/reservations")}
            />
            <MenuItem
              title="My Profile"
              style="text-main-gray"
              onClick={() => router.push("/profile")}
            />
            <MenuItem
              title="Sign Out"
              onClick={() => logOut()}
              style="text-main-gray"
            />
          </div>
        )}
      </div>
    );
  }
};

export default UserMenu;
