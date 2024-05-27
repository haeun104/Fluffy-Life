"use client";

import useSearchSubmit from "@/hooks/useSearchSubmit";
import GroomingCalendar from "./GroomingCalendar";
import { getFormattedDate } from "@/util";

interface GroomingReservationProps {
  availableTimes: string[] | undefined;
}

const GroomingReservation: React.FC<GroomingReservationProps> = ({
  availableTimes,
}) => {
  const { submitSearch } = useSearchSubmit();

  const onChangeDate = (date: Date) => {
    const queryData = {
      service: "grooming",
      startDate: "",
      endDate: "",
      date: getFormattedDate(date),
    };
    submitSearch(queryData);
  };

  return (
    <div>
      <h3 className="text-accent-light-green font-bold mb-4">Reservation</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <h4 className="mb-2">Select date for service</h4>
          <div className="border-[1px] rounded-md flex justify-center overflow-hidden shadow-md">
            <GroomingCalendar onChange={onChangeDate} />
          </div>
        </div>
        <div>
          <h4 className="mb-2">Select time that you want</h4>
          <div className="flex gap-4">
            {availableTimes &&
              availableTimes.map((time, index) => (
                <div
                  key={index}
                  className="border-[1px] rounded-md shadow-md py-2 px-4 cursor-pointer"
                >
                  {time}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroomingReservation;
