"use client";

import { Room } from "@prisma/client";
import Button from "../Button";
import { useMemo, useState } from "react";
import { format } from "date-fns";

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
  const [isReservationPassed, setIsReservationPassed] = useState(false);

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
        <p className="text-sm">{`from ${formatDate.start} to ${formatDate.end}`}</p>
        <span className="font-bold">{totalPrice} PLN</span>
      </div>
      {!isReservationPassed ? (
        <div className="flex flex-col gap-2">
          <Button
            title="Edit reservation"
            style="bg-accent-light-green text-sm font-normal"
          />
          <Button
            title="Cancel reservation"
            style="bg-main-gray text-sm font-normal"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="text-sm">Finished</div>
          <Button
            title="Write a review"
            style="bg-accent-light-green text-sm font-normal"
          />
        </div>
      )}
    </div>
  );
};

export default ReservationItem;
