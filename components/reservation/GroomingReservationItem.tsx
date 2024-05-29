"use client";

import axios from "axios";
import { format, formatISO } from "date-fns";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import Button from "../Button";

interface GroomingReservationItemProps {
  reservationId: string;
  date: Date;
  time: string;
  petName: string;
}
const GroomingReservationItem: React.FC<GroomingReservationItemProps> = ({
  reservationId,
  date,
  time,
  petName,
}) => {
  const [menuHidden, setMenuHidden] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const isPassedDate = date < new Date();

  // Close the menu when the user clicks outside
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuHidden(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToGroomingPage = () => {
    router.push("/grooming");
  };

  const handleCancelClick = async () => {
    try {
      await axios.delete(`/api/grooming/${reservationId}`);
      toast.success("Successfully canceled");
      router.refresh();
    } catch (error) {
      toast.error("Failed to cancel");
      console.error(error);
    }
  };

  const handleChangeClick = () => {
    const formattedDate = formatISO(date);
    const query = {
      reservationId,
      date: formattedDate,
    };
    const url = queryString.stringifyUrl(
      {
        url: "/groomingChange",
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <div className="border-[1px] border-[#EEEEEE] rounded-md p-4 shadow-md flex justify-between">
      <div className="flex flex-col">
        <div className="flex font-bold gap-8">
          <div>{format(date, "dd/MM/yyyy")}</div>
          <div>{time}</div>
        </div>
        <span>{petName}</span>
        {isPassedDate && (
          <span className="font-bold text-main-teal text-sm">Finished</span>
        )}
      </div>
      <div className="relative sm:hidden">
        <div
          className="cursor-pointer"
          onClick={() => setMenuHidden(!menuHidden)}
        >
          <BsThreeDots />
        </div>
        <div
          ref={menuRef}
          className={`text-sm text-right absolute top-6 right-0 ${
            menuHidden ? "hidden" : ""
          } bg-white border-[1px] border-[#EEEEEE] rounded-lg px-4 py-2 whitespace-nowrap`}
        >
          {isPassedDate ? (
            <div className="cursor-pointer" onClick={goToGroomingPage}>
              Reserve again
            </div>
          ) : (
            <>
              <div className="cursor-pointer mb-2" onClick={handleChangeClick}>
                Change reservation
              </div>
              <div className="cursor-pointer" onClick={handleCancelClick}>
                Cancel reservation
              </div>
            </>
          )}
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:gap-2 min-w-[170px]">
        {isPassedDate ? (
          <Button
            title="Reserve again"
            style="bg-accent-red text-sm font-normal"
            onClick={goToGroomingPage}
          />
        ) : (
          <>
            <Button
              title="Change reservation"
              style="bg-accent-light-green text-sm font-normal"
              onClick={handleChangeClick}
            />
            <Button
              title="Cancel reservation"
              style="bg-[#DDDDDD] text-sm font-normal"
              onClick={handleCancelClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GroomingReservationItem;
