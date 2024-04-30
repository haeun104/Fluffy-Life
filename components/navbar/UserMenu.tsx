"use client";

import { UserData } from "@/types";
import avatar from "@/public/images/avatar.jpg";
import Image from "next/image";

interface UserMenuProps {
  currentUser: UserData | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  if (currentUser) {
    return (
      <>
      <div className="flex h-full gap-2 items-center cursor-pointer">
        <div className="text-main-gray font-semibold group-hover:text-white uppercase hidden lg:flex">
          {`${currentUser.firstName} ${currentUser.lastName}`}
        </div>
        <div className="rounded-full overflow-hidden">
          <Image src={avatar} alt="avatar" height={30} width={30} />
        </div>
      </div>
      </>
    );
  }
};

export default UserMenu;
