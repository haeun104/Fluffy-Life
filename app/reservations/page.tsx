import getCurrentUser from "@/actions/getCurrentUser";
import getHotelReservation from "@/actions/getHotelReservationsByUser";
import Container from "@/components/Container";
import HotelReservations from "@/components/reservation/HotelReservations";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    const hotelReservations = await getHotelReservation(currentUser.id);

    return (
      <Container>
        <div className="py-10 max-w-[600px] mx-auto">
          <h2 className="text-main-teal text-lg font-bold">My Reservations</h2>
          <HotelReservations hotelReservations={hotelReservations} />
        </div>
      </Container>
    );
  }
};

export default ReservationsPage;
