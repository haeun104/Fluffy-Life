import getCurrentUser from "@/actions/getCurrentUser";
import HotelRoomClient from "./HotelRoomClient";
import getRoomDetail from "@/actions/getRoomDetail";
import getHotelReservation from "@/actions/getHotelReservation";

interface HotelRoomParams {
  hotelRoom: string;
}

const HotelRoomPage = async ({ params }: { params: HotelRoomParams }) => {
  const room = await getRoomDetail(params.hotelRoom);
  const reservations = await getHotelReservation(params.hotelRoom);
  const currentUser = await getCurrentUser();

  if (!room || !reservations) {
    return null;
  }

  return (
    <HotelRoomClient
      selectedRoom={room}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default HotelRoomPage;