import RoomList from "@/components/hotel/RoomList";
import Container from "@/components/Container";
import getAvailableRooms, {
  RoomSearchParams,
} from "@/actions/getAvailableRooms";

const HotelPage = async ({
  searchParams,
}: {
  searchParams: RoomSearchParams;
}) => {
  const rooms = await getAvailableRooms(searchParams);

  if (!rooms) {
    return null;
  }

  return (
    <Container>
      <div className="py-10 max-w-[350px] sm:max-w-[800px] flex flex-col gap-4 mx-auto">
        <h2 className="text-main-teal text-lg font-bold">Rooms</h2>
        <RoomList
          searchParams={searchParams}
        />
      </div>
    </Container>
  );
};

export default HotelPage;
