"use client";

import { GroomingReservation } from "@prisma/client";
import GroomingReservationItem from "./GroomingReservationItem";
import { useRef, useState } from "react";

interface GroomingReservationsProps {
  groomingReservations: GroomingReservation[] | undefined;
}

const GroomingReservations: React.FC<GroomingReservationsProps> = ({
  groomingReservations,
}) => {
  const [visibleReservations, setVisibleReservations] = useState(3);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMoreReservations = () => {
    if (groomingReservations) {
      setVisibleReservations((prev) =>
        Math.min(prev + 3, groomingReservations.length)
      );
    }

    if (loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const hidePreviousReservation = () => {
    setVisibleReservations(3);
    if (loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <h3 className="font-bold text-accent-light-green text-lg mt-8 mb-4">
        Grooming
      </h3>
      {!groomingReservations || groomingReservations.length === 0 ? (
        <div className="mt-8">There is no reservations</div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {groomingReservations
              .slice(0, visibleReservations)
              .map((reservation) => (
                <GroomingReservationItem
                  key={reservation.id}
                  reservationId={reservation.id}
                  date={reservation.date}
                  time={reservation.time}
                  petName={reservation.petName}
                />
              ))}
          </div>
          <div
            className={`border-[1px] border-[#EEEEEE] rounded-md p-2 shadow-md flex gap-4 mt-4 justify-center hover:bg-[#EEEEEE] ${
              groomingReservations.length <= 3 && "hidden"
            }`}
            ref={loadMoreRef}
          >
            {visibleReservations < groomingReservations.length ? (
              <div onClick={loadMoreReservations} className="cursor-pointer">
                Load previous reservations
              </div>
            ) : (
              <div onClick={hidePreviousReservation} className="cursor-pointer">
                Hide previous reservations
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GroomingReservations;
