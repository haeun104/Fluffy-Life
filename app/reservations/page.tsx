import getCurrentUser from "@/actions/getCurrentUser";
import getHotelReservationByUser from "@/actions/getHotelReservationsByUser";
import getHotelReviews from "@/actions/getHotelReviews";
import Container from "@/components/Container";
import HotelReservations from "@/components/reservation/HotelReservations";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    const hotelReservations = await getHotelReservationByUser(currentUser.id);
    const hotelReviews = await getHotelReviews(currentUser.id, true);
    hotelReservations?.sort(
      (a, b) => a.startDate.getTime() - b.startDate.getTime()
    );

    return (
      <Container>
        <div className="py-10 max-w-[600px] mx-auto">
          <h2 className="text-main-teal text-lg font-bold">My Reservations</h2>
          <HotelReservations
            hotelReservations={hotelReservations}
            hotelReviews={hotelReviews}
            currentUser={currentUser}
          />
        </div>
      </Container>
    );
  }
};

export default ReservationsPage;
