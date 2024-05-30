import getCurrentUser from "@/actions/getCurrentUser";
import getGroomingReservations from "@/actions/getGroomingReservationsByUser";
import getHotelReservationByUser from "@/actions/getHotelReservationsByUser";
import getHotelReviews from "@/actions/getHotelReviews";
import Container from "@/components/Container";
import GroomingReservations from "@/components/reservation/GroomingReservations";
import HotelReservations from "@/components/reservation/HotelReservations";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    const hotelReservations = await getHotelReservationByUser(currentUser.id);
    const hotelReviews = await getHotelReviews(currentUser.id, true);

    const groomingReservations = await getGroomingReservations(currentUser.id);

    return (
      <Container>
        <div className="py-10 max-w-[600px] mx-auto">
          <h2 className="text-main-teal text-lg font-bold">My Reservations</h2>
          <HotelReservations
            hotelReservations={hotelReservations}
            hotelReviews={hotelReviews}
            currentUser={currentUser}
          />
          <GroomingReservations groomingReservations={groomingReservations} />
        </div>
      </Container>
    );
  }
};

export default ReservationsPage;
