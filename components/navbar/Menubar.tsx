"use client";

import Button from "../Button";
import MenuItem from "./MenuItem";
import useSignUpModal from "@/hooks/useSignUpModal";
import useLoginModal from "@/hooks/useLoginModal";
import { UserData } from "@/types";
import { useRouter, usePathname } from "next/navigation";

export const menuItems = [
  {
    title: "about us",
    url: "/about",
  },
  {
    title: "hotel",
    url: "/hotel",
  },
  {
    title: "grooming",
    url: "/grooming",
  },
  {
    title: "events",
    url: "/events",
  },
];

interface MenubarProps {
  currentUser: UserData | null;
}

const Menubar: React.FC<MenubarProps> = ({ currentUser }) => {
  const signUpModal = useSignUpModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-10">
        <ul className="uppercase font-bold text-main-teal flex gap-6">
          {menuItems.map((item, index) => {
            return (
              <MenuItem
                key={index}
                title={item.title}
                onClick={() => router.push(item.url)}
                style={`border-b-[2px] hover:border-b-main-teal cursor-pointer ${
                  pathName === item.url
                    ? "border-b-main-teal"
                    : "border-b-white"
                }`}
              />
            );
          })}
        </ul>
        <div className={currentUser ? "hidden" : "flex gap-6"}>
          <Button
            title="LOGIN"
            style="bg-accent-light-green"
            onClick={loginModal.onOpen}
          />
          <Button title="SIGN UP" onClick={signUpModal.onOpen} />
        </div>
      </div>
    </>
  );
};

export default Menubar;
