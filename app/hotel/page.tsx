import RoomList from "@/components/hotel/RoomList";
import getAllRooms from "@/actions/getAllRooms";

const HotelPage = async () => {
  const rooms = await getAllRooms();

  if (!rooms) {
    return null;
  }

  return (
    <div>
      <RoomList rooms={rooms} />
    </div>
  );
};

export default HotelPage;
