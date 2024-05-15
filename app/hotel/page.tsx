import RoomList from "@/components/hotel/RoomList";
import getAllRooms from "@/actions/getAllRooms";
import Container from "@/components/Container";

const HotelPage = async () => {
  const rooms = await getAllRooms();

  if (!rooms) {
    return null;
  }

  return (
    <Container>
      <div className="py-10 max-w-[350px] sm:max-w-[800px] flex flex-col mx-auto">
        <h2 className="text-main-teal text-lg font-bold">Available Rooms</h2>
        <RoomList rooms={rooms} />
      </div>
    </Container>
  );
};

export default HotelPage;
