import { HotelReservation } from "@prisma/client";
import ReservationItem from "./ReservationItem";
import getRoomDetail from "@/actions/getRoomDetail";

interface HotelReservationsProps {
  hotelReservations: HotelReservation[] | undefined;
}

const HotelReservations: React.FC<HotelReservationsProps> = ({
  hotelReservations,
}) => {
  const getRoomInfo = async (roomId: string) => {
    try {
      const room = await getRoomDetail(roomId);
      return room;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <h3 className="text-accent-light-green font-bold text-lg mt-8">Hotel</h3>
      {hotelReservations?.length === 0 || !hotelReservations ? (
        <div>There is no reservations</div>
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {hotelReservations.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              id={reservation.id}
              startDate={reservation.startDate}
              endDate={reservation.endDate}
              totalPrice={reservation.totalPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelReservations;
