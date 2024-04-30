"use client";

import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { menuItems } from "./Menubar";
import MenuItem from "./MenuItem";
import { UserData } from "@/types";
import useLoginModal from "@/hooks/useLoginModal";
import useSignUpModal from "@/hooks/useSignUpModal";

interface MenuDropdownProps {
  currentUser: UserData | null;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ currentUser }) => {
  const [toggle, setToggle] = useState(false);
  const loginModal = useLoginModal();
  const signUpModal = useSignUpModal();

  return (
    <div className="lg:hidden">
      <div
        className={`text-main-teal cursor-pointer ${toggle && "hidden"}`}
        onClick={() => setToggle(!toggle)}
      >
        <IoMdMenu size={36} />
      </div>
      <div
        className={`text-main-teal cursor-pointer ${!toggle && "hidden"}`}
        onClick={() => setToggle(!toggle)}
      >
        <IoMdClose size={36} />
      </div>
      <ul
        className={`uppercase font-bold text-main-teal flex flex-col gap-6 absolute left-0 w-full bg-white px-[50px] py-[30px] ${
          !toggle && "hidden"
        }`}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} title={item.title} url={item.url} />
        ))}
        <li
          className={
            currentUser ? "hidden" : "text-accent-light-green cursor-pointer"
          }
          onClick={loginModal.onOpen}
        >
          login
        </li>
        <li
          className={currentUser ? "hidden" : "text-accent-red cursor-pointer"}
          onClick={signUpModal.onOpen}
        >
          sign up
        </li>
      </ul>
    </div>
  );
};

export default MenuDropdown;
