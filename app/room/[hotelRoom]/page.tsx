import getCurrentUser from "@/actions/getCurrentUser";
import HotelRoomClient from "./HotelRoomClient";
import getRoomDetail from "@/actions/getRoomDetail";
import getHotelReservation from "@/actions/getReservationsByRoom";
import { HotelReservation } from "@prisma/client";
import ReviewListModal from "@/components/modals/ReviewListModal";
import getAverageRating from "@/actions/getAverageRating";

export async function generateMetadata({
  params,
}: {
  params: HotelRoomParams;
}) {
  const room = await getRoomDetail(params.hotelRoom);
  return {
    title: `Fluffy Life - ${room?.roomType}`,
    description: room?.description,
  };
}

interface HotelRoomParams {
  hotelRoom: string;
}

const HotelRoomPage = async ({ params }: { params: HotelRoomParams }) => {
  const room = await getRoomDetail(params.hotelRoom);
  const reservations: HotelReservation[] | undefined =
    await getHotelReservation(params.hotelRoom);
  const currentUser = await getCurrentUser();
  const rating = await getAverageRating(params.hotelRoom);

  if (room && reservations) {
    return (
      <>
        <HotelRoomClient
          selectedRoom={room}
          currentUser={currentUser}
          reservations={reservations}
          rating={rating}
        />
        <ReviewListModal roomId={params.hotelRoom} rating={rating} />
      </>
    );
  }
};

export default HotelRoomPage;
