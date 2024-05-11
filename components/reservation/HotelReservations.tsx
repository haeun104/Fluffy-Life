import { Room } from "@prisma/client";
import ReservationItem from "./ReservationItem";

interface HotelReservation {
  id: string;
  userId: string;
  roomId: string;
  petChipNumber: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  room: Room;
}

interface HotelReservationsProps {
  hotelReservations: HotelReservation[] | undefined;
}

const HotelReservations: React.FC<HotelReservationsProps> = ({
  hotelReservations,
}) => {
  return (
    <div className="">
      <h3 className="text-accent-light-green font-bold text-lg mt-8">Hotel</h3>
      {hotelReservations?.length === 0 || !hotelReservations ? (
        <div>There is no reservations</div>
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {hotelReservations.map((reservation) => {
            const { imageUrl, roomType } = reservation.room;
            return (
              <ReservationItem
                key={reservation.id}
                id={reservation.id}
                startDate={reservation.startDate}
                endDate={reservation.endDate}
                totalPrice={reservation.totalPrice}
                imageUrl={imageUrl}
                roomType={roomType}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HotelReservations;
