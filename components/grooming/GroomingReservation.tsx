"use client";

import GroomingCalendar from "./GroomingCalendar";

const GroomingReservation = () => {
  return (
    <div>
      <h3 className="text-accent-light-green font-bold mb-4">Reservation</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <h4 className="mb-2">Select date for service</h4>
          <div className="border-[1px] rounded-md flex justify-center overflow-hidden">
            <GroomingCalendar />
          </div>
        </div>
        <div>
          <h4 className="mb-2">Select time that you want</h4>
        </div>
      </div>
    </div>
  );
};

export default GroomingReservation;
