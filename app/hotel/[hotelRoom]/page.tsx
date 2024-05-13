import getCurrentUser from "@/actions/getCurrentUser";
import HotelRoomClient from "./HotelRoomClient";
import getRoomDetail from "@/actions/getRoomDetail";
import getHotelReservation from "@/actions/getReservationsByRoom";
import { HotelReservation } from "@prisma/client";
import getHotelReviews from "@/actions/getHotelReviews";

interface HotelRoomParams {
  hotelRoom: string;
}

const HotelRoomPage = async ({ params }: { params: HotelRoomParams }) => {
  const room = await getRoomDetail(params.hotelRoom);
  const reservations: HotelReservation[] | undefined =
    await getHotelReservation(params.hotelRoom);
  const currentUser = await getCurrentUser();
  const reviews = await getHotelReviews(params.hotelRoom, false);

  if (!room) {
    return null;
  }

  return (
    <HotelRoomClient
      selectedRoom={room}
      currentUser={currentUser}
      reservations={reservations}
      reviews={reviews}
    />
  );
};

export default HotelRoomPage;
