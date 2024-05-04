import getCurrentUser from "@/actions/getCurrentUser";
import HotelRoomClient from "./HotelRoomClient";
import getRoomDetail from "@/actions/getRoomDetail";

interface HotelRoomParams {
  hotelRoom: string;
}

const HotelRoomPage = async ({ params }: { params: HotelRoomParams }) => {
  const room = await getRoomDetail(params.hotelRoom);
  const currentUser = await getCurrentUser();

  if (!room) {
    return null;
  }

  return <HotelRoomClient selectedRoom={room} currentUser={currentUser} />;
};

export default HotelRoomPage;
