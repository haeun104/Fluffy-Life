"use client";

import useRoomSearchModal from "@/hooks/useRoomSearchModal";
import { IoMdSearch } from "react-icons/io";
import RoomSearchModal from "../modals/RoomSearchModal";
import RoomSearchInputs from "../inputs/RoomSearchInputs";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const schema = z
  .object({
    startDate: z.string(),
    endDate: z.string(),
    roomType: z.string(),
  })
  .refine(
    (data) => {
      return (
        (data.startDate !== "" && data.endDate !== "") ||
        (data.startDate === "" && data.endDate === "")
      );
    },
    {
      message: "Both of check in and out dates need to be input",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      const start = new Date(data.startDate).getTime();
      const end = new Date(data.endDate).getTime();
      return start < end && start !== end;
    },
    {
      message: "Check-out date must be later than check-in date",
      path: ["endDate"],
    }
  );

const RoomSearchBar = () => {
  const roomSearchModal = useRoomSearchModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      startDate: "",
      endDate: "",
      roomType: "all",
    },
    resolver: zodResolver(schema),
  });

  const searchAvailableRoom = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <div className="hidden sm:flex gap-2 items-start">
        <RoomSearchInputs
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
        <div className="flex pb-4 h-[88px] items-end">
          <button
            onClick={handleSubmit(searchAvailableRoom)}
            className="h-[44px] cursor-pointer"
          >
            <IoMdSearch size={28} />
          </button>
        </div>
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
