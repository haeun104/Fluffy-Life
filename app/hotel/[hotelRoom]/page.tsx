interface HotelRoomParams {
  hotelRoom: string;
}
const HotelRoomPage = ({ params }: { params: HotelRoomParams }) => {
  return <div>This is {params.hotelRoom} room page</div>;
};

export default HotelRoomPage;
