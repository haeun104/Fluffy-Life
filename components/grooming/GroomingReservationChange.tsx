"use client";

import { format } from "date-fns";
import GroomingCalendar from "./GroomingCalendar";
import { useState } from "react";
import { petNames } from "./GroomingReservation";

interface GroomingReservationChangeProps {
  reservationId: string;
  date: Date;
  time: string;
  petName: string;
}

const GroomingReservationChange: React.FC<GroomingReservationChangeProps> = ({
  reservationId,
  date,
  time,
  petName,
}) => {
  const [pets, setPets] = useState<petNames[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [selectedTime, setSelectedTime] = useState(time);
  const [selectedPet, setSelectedPet] = useState(petName);

  const onChangeDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="mt-4">
      <div>
        <div>
          <h3 className="font-bold text-accent-light-green">
            Reservation before change
          </h3>
          <div className="flex gap-4 my-4">
            <span className="font-bold">{format(date, "dd/MM/yyyy")}</span>
            <span className="font-bold">{time}</span>
            <span>{petName}</span>
          </div>
        </div>
        <h3 className="font-bold text-accent-light-green mt-8 mb-4">
          Select new date
        </h3>
        <div className="border-[1px] max-w-[350px] rounded-md flex justify-center overflow-hidden shadow-md lg:w-[350px]">
          <GroomingCalendar
            selectedDate={selectedDate}
            onChange={onChangeDate}
          />
        </div>
      </div>
    </div>
  );
};

export default GroomingReservationChange;
