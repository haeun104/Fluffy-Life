import RoomList from "@/components/hotel/RoomList";
import getAllRooms from "@/actions/getAllRooms";
import Container from "@/components/Container";
import RoomSearchBar from "@/components/hotel/RoomSearchBar";
import getAvailableRooms from "@/actions/getAvailableRooms";

interface SearchQueryType {
  startDate: string;
  endDate: string;
  roomType: string;
}

const HotelPage = async () => {
  let rooms = await getAllRooms();

  const fetchAvailableRooms = async (searchQuery: SearchQueryType) => {
      rooms = await getAvailableRooms(searchQuery);
  };

  if (!rooms) {
    return null;
  }

  return (
    <Container>
      <div className="py-10 max-w-[350px] sm:max-w-[800px] flex flex-col gap-4 mx-auto">
        <h2 className="text-main-teal text-lg font-bold">Rooms</h2>
        <div>
          <h3 className="text-accent-light-green font-bold mb-2">
            Quick availability check
          </h3>
          <RoomSearchBar />
        </div>
        <RoomList rooms={rooms} />
      </div>
    </Container>
  );
};

export default HotelPage;
