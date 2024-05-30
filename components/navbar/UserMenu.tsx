"use client";

import { UserData } from "@/types";
import avatar from "@/public/images/avatar.jpg";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

interface UserMenuProps {
  currentUser: UserData | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu when the user clicks outside
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOut = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error(error);
    }
  };

  if (currentUser === null) {
    return <div className="h-[36px] w-[36px] lg:hidden"></div>;
  }

  return (
    <div
      className="flex h-full gap-2 items-center cursor-pointer"
      ref={menuRef}
    >
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
        <div className="absolute right-0 top-[69px] flex flex-col bg-white w-screen sm:w-[250px]">
          <MenuItem
            title="My Reservations"
            style="text-main-gray px-4 py-2 indent-4 hover:bg-[#EEEEEE]"
            onClick={() => {
              router.push("/reservations");
              setIsOpen(false);
            }}
          />
          <MenuItem
            title="My Account"
            style="text-main-gray px-4 py-2 indent-4 hover:bg-[#EEEEEE]"
            onClick={() => {
              router.push("/account");
              setIsOpen(false);
            }}
          />
          <MenuItem
            title="Sign Out"
            onClick={() => logOut()}
            style="text-main-gray px-4 py-2 indent-4 hover:bg-[#EEEEEE]"
          />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
