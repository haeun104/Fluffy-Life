import getCurrentUser from "@/actions/getCurrentUser";
import getGroomingReservations from "@/actions/getGroomingReservationsByUser";
import getHotelReservationByUser from "@/actions/getHotelReservationsByUser";
import Container from "@/components/Container";
import GroomingReservations from "@/components/reservation/GroomingReservations";
import HotelReservations from "@/components/reservation/HotelReservations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fluffy Life - My Reservations",
  description:
    "View and manage your hotel bookings easily with our user-friendly reservation dashboard.",
};

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    const initialReservations = await getHotelReservationByUser(
      currentUser.id,
      0
    );
    const groomingReservations = await getGroomingReservations(currentUser.id);

    if (initialReservations) {
      return (
        <Container>
          <div className="py-10 max-w-[600px] mx-auto">
            <h2 className="text-main-teal text-lg font-bold">
              My Reservations
            </h2>
            <HotelReservations
              initialReservations={initialReservations}
              currentUser={currentUser.id}
            />
            <GroomingReservations groomingReservations={groomingReservations} />
          </div>
        </Container>
      );
    }
  }
};

export default ReservationsPage;
