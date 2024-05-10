"use client";

import Button from "../Button";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { isAfter } from "date-fns";
import { BsThreeDots } from "react-icons/bs";

interface ReservationItemProps {
  id: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

const ReservationItem: React.FC<ReservationItemProps> = ({
  id,
  startDate,
  endDate,
  totalPrice,
}) => {
  const [isReservationPassed, setIsReservationPassed] = useState<boolean>();
  const [menuHidden, setMenuHidden] = useState(true);

  useEffect(() => {
    setIsReservationPassed(isAfter(new Date(), startDate));
  }, [startDate]);

  const formatDate = useMemo(() => {
    const start = format(startDate, "MM/dd/yyyy");
    const end = format(endDate, "MM/dd/yyyy");
    return {
      start,
      end,
    };
  }, [startDate, endDate]);

  return (
    <div className="border-solid border-[1px] border-[#EEEEEE] rounded-md p-4 shadow-md flex gap-4">
      <div className="w-[70px] border-solid border-[1px] border-[#EEEEEE] rounded-md">
        room image
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="font-bold">room name</h3>
        <span className="font-bold">{totalPrice} PLN</span>
        <p className="text-sm">{`from ${formatDate.start} to ${formatDate.end}`}</p>
        {isReservationPassed && <span className="text-sm">Finished</span>}
      </div>
      {!isReservationPassed ? (
        <div className="hidden sm:flex sm:flex-col sm:gap-2">
          <Button
            title="Edit reservation"
            style="bg-accent-light-green text-sm font-normal"
          />
          <Button
            title="Cancel reservation"
            style="bg-[#DDDDDD] text-sm font-normal"
          />
        </div>
      ) : (
        <div className="hidden sm:flex sm:flex-col sm:gap-2 min-w-[160px]">
          <Button
            title="Write a review"
            style="bg-accent-light-green text-sm font-normal"
          />
          <Button
            title="Reserve again"
            style="bg-accent-red text-sm font-normal"
          />
        </div>
      )}
      <div className="sm:hidden relative">
        <div
          className="cursor-pointer"
          onClick={() => setMenuHidden(!menuHidden)}
        >
          <BsThreeDots />
        </div>
        <div
          className={`text-sm text-right absolute top-6 right-0 ${
            menuHidden ? "hidden" : ""
          } bg-white border-solid border-[1px] border-[#EEEEEE] rounded-lg px-4 py-2`}
        >
          {!isReservationPassed ? (
            <>
              <div>Edit reservation</div>
              <div>Cancel reservation</div>
            </>
          ) : (
            <>
              <div>Write a review</div>
              <div>Reserve again</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationItem;
