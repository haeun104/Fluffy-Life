import { GroomingReservation } from "@prisma/client";
import GroomingReservationItem from "./GroomingReservationItem";

interface GroomingReservationsProps {
  groomingReservations: GroomingReservation[] | undefined;
}

const GroomingReservations: React.FC<GroomingReservationsProps> = ({
  groomingReservations,
}) => {
  return (
    <div>
      <h3 className="font-bold text-accent-light-green text-lg mt-8 mb-4">
        Grooming
      </h3>
      {!groomingReservations ? (
        <div>There is no reservations</div>
      ) : (
        <div className="flex flex-col gap-4">
          {groomingReservations.map((reservation) => (
            <GroomingReservationItem
              key={reservation.id}
              reservationId={reservation.id}
              date={reservation.date}
              time={reservation.time}
              petName={reservation.petName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GroomingReservations;
