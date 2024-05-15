"use client";

import useRoomSearchModal from "@/hooks/useRoomSearchModal";
import { IoMdSearch } from "react-icons/io";
import RoomSearchModal from "../modals/RoomSearchModal";
import RoomSearchInputs from "../inputs/RoomSearchInputs";
import { FieldValues, useForm } from "react-hook-form";

const RoomSearchBar = () => {
  const roomSearchModal = useRoomSearchModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const searchAvailableRoom = (data: FieldValues) => {};

  return (
    <>
      <div className="hidden sm:flex gap-2 items-end">
        <RoomSearchInputs
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
        <button
          className="mb-4 h-[44px] flex items-center"
          onClick={handleSubmit(searchAvailableRoom)}
        >
          <IoMdSearch size={28} />
        </button>
      </div>
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
