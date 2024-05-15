"use client";

import useRoomSearchModal from "@/hooks/useRoomSearchModal";
import { IoMdSearch } from "react-icons/io";
import RoomSearchModal from "../modals/RoomSearchModal";

const RoomSearchBar = () => {
  const roomSearchModal = useRoomSearchModal();

  return (
    <>
      <form className="hidden border-solid border-[1px] border-[#EEEEEE] rounded-lg p-2 sm:flex">
        <label className="w-[30%]">
          <input type="date" />
        </label>
        <label className="w-[30%]">
          <input type="date" />
        </label>
        <label className="w-[30%]">
          <select name="" id="">
            <option value="">All</option>
            <option value="">Suite</option>
            <option value="">Standard</option>
            <option value="">Suite Package</option>
            <option value="">Standard Package</option>
          </select>
        </label>
        <div className="w-[10%]">
          <button></button>
        </div>
      </form>
      <div
        className="border-solid border-[1px] border-[#EEEEEE] rounded-lg p-2 flex justify-between items-center cursor-pointer sm:hidden"
        onClick={() => roomSearchModal.onOpen()}
      >
        <div className="flex flex-col">
          <span className="text-xs font-bold">Check-in</span>
          <span className="text-sm">MM/DD/YYYY</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold">Check-out</span>
          <span className="text-sm">MM/DD/YYYY</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold">Room type</span>
          <span className="text-sm text-center">All</span>
        </div>
        <div>
          <IoMdSearch size={28} />
        </div>
      </div>
      <RoomSearchModal />
    </>
  );
};

export default RoomSearchBar;
