import RoomList from "@/components/hotel/RoomList";
import getAllRooms from "@/actions/getAllRooms";

const HotelPage = async () => {
  const rooms = await getAllRooms();

  if (!rooms) {
    return null;
  }

  return (
    <div className="py-10">
      <RoomList rooms={rooms} />
    </div>
  );
};

export default HotelPage;
