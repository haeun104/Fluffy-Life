"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

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
      <div className="relative">
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
              <div className="cursor-pointer mb-2">Change reservation</div>
              <div className="cursor-pointer">Cancel reservation</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroomingReservationItem;
