import HotelRoomClient from "./HotelRoomClient";
import getRoomDetail from "@/actions/getRoomDetail";

interface HotelRoomParams {
  hotelRoom: string;
}

const HotelRoomPage = async ({ params }: { params: HotelRoomParams }) => {
  const room = await getRoomDetail(params.hotelRoom);

  if (!room) {
    return null;
  }

  return <HotelRoomClient selectedRoom={room} />;
};

export default HotelRoomPage;
