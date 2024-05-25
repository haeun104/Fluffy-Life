"use client";

import useRoomSearchModal from "@/hooks/useRoomSearchModal";
import { IoMdSearch } from "react-icons/io";
import RoomSearchModal from "../modals/RoomSearchModal";
import RoomSearchInputs from "../inputs/RoomSearchInputs";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { changeDateFromString, changeDateToYYYMMDD } from "@/util";
import { GrPowerReset } from "react-icons/gr";
import useSearchSubmit from "@/hooks/useSearchSubmit";

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
      const isBothEmpty = isNaN(start) && isNaN(end);
      return (start < end && start !== end) || isBothEmpty;
    },
    {
      message: "Check-out date must be later than check-in date",
      path: ["endDate"],
    }
  );

interface RoomSearchProps {
  startDate: string | undefined;
  endDate: string | undefined;
  roomType: string | undefined;
}

const RoomSearchBar: React.FC<RoomSearchProps> = ({
  startDate,
  endDate,
  roomType,
}) => {
  const roomSearchModal = useRoomSearchModal();
  const router = useRouter();
  const { submitSearch } = useSearchSubmit();

  const [searchData, setSearchData] = useState({
    startDate: "DD/MM/YYYY",
    endDate: "DD/MM/YYYY",
    roomType: "All",
  });

  useEffect(() => {
    if (startDate && endDate) {
      const start = changeDateFromString(startDate);
      const end = changeDateFromString(endDate);

      setSearchData((prev) => ({
        ...prev,
        startDate: start,
        endDate: end,
      }));
    }
    if (roomType) {
      setSearchData((prev) => ({
        ...prev,
        roomType: roomType,
      }));
    }
  }, [startDate, endDate, roomType]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      startDate: startDate ? changeDateToYYYMMDD(startDate) : "",
      endDate: endDate ? changeDateToYYYMMDD(endDate) : "",
      roomType: roomType || "All",
    },
    resolver: zodResolver(schema),
  });

  const searchAvailableRoom = (data: FieldValues) => {
    const searchData = { ...data, service: "hotel" };
    submitSearch(searchData);
  };

  const resetSearch = () => {
    setSearchData({
      startDate: "DD/MM/YYYY",
      endDate: "DD/MM/YYYY",
      roomType: "All",
    });
    router.push("/hotel");
    reset({
      startDate: "",
      endDate: "",
      roomType: "All",
    });
  };

  return (
    <>
      <div className="hidden sm:flex gap-2 items-start relative">
        <div
          className="absolute -top-7 right-0 flex gap-1 items-center cursor-pointer"
          onClick={resetSearch}
        >
          <span>reset</span>
          <GrPowerReset size={20} className="" />
        </div>
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
      <div className="relative sm:hidden">
        <div className="absolute -top-7 right-3" onClick={resetSearch}>
          <GrPowerReset size={18} />
        </div>
        <div
          className="border-solid border-[1px] border-[#EEEEEE] rounded-lg p-2 flex justify-between items-center cursor-pointer"
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
      </div>
      <RoomSearchModal searchAvailableRoom={searchAvailableRoom} />
    </>
  );
};

export default RoomSearchBar;
