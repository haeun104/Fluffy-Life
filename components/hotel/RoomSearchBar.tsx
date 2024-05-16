"use client";

import useRoomSearchModal from "@/hooks/useRoomSearchModal";
import { IoMdSearch } from "react-icons/io";
import RoomSearchModal from "../modals/RoomSearchModal";
import RoomSearchInputs from "../inputs/RoomSearchInputs";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoomData } from "@/types";
import getAvailableRooms from "@/actions/getAvailableRooms";
import { useState } from "react";
import { changeDateStrOrder } from "@/util";

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

interface RoomSearchBarProps {
  updateAvailableRooms: (rooms: RoomData[] | undefined) => void;
}

const RoomSearchBar: React.FC<RoomSearchBarProps> = ({
  updateAvailableRooms,
}) => {
  const [searchData, setSearchData] = useState({
    startDate: "MM/DD/YYYY",
    endDate: "MM/DD/YYYY",
    roomType: "All",
  });

  const roomSearchModal = useRoomSearchModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      startDate: "",
      endDate: "",
      roomType: "All",
    },
    resolver: zodResolver(schema),
  });

  const searchAvailableRoom = async (data: FieldValues) => {
    try {
      const availableRooms = await getAvailableRooms(data);
      updateAvailableRooms(availableRooms);
      setSearchData({
        startDate: changeDateStrOrder(data.startDate),
        endDate: changeDateStrOrder(data.endDate),
        roomType: data.roomType,
      });
    } catch (error) {
      console.error(error);
    }
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
          <span className="text-sm">{searchData.startDate}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold">Check-out</span>
          <span className="text-sm">{searchData.endDate}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold">Room type</span>
          <span className="text-sm text-center">{searchData.roomType}</span>
        </div>
        <div>
          <IoMdSearch size={28} />
        </div>
      </div>
      <RoomSearchModal searchAvailableRoom={searchAvailableRoom} />
    </>
  );
};

export default RoomSearchBar;
