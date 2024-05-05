interface HotelReservationPrams {
  hotelRoom: string;
}

const HotelReservationPage = ({
  params,
}: {
  params: HotelReservationPrams;
}) => {
  return <div>{params.hotelRoom} reservation page</div>;
};

export default HotelReservationPage;
