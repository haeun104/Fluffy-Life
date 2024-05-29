import getAvailableTimes from "@/actions/getAvailableTimes";
import getCurrentUser from "@/actions/getCurrentUser";
import getGroomingReservationById from "@/actions/getGroomingReservationById";
import Container from "@/components/Container";
import GroomingReservationChange from "@/components/grooming/GroomingReservationChange";

export interface GroomingChangeParams {
  reservationId: string;
  date: Date;
}

const GroomingChangePage = async ({
  searchParams,
}: {
  searchParams: GroomingChangeParams;
}) => {
  const currentUser = await getCurrentUser();
  const { reservationId, date } = searchParams;

  const previousReservation = await getGroomingReservationById(reservationId);
  const times = await getAvailableTimes(date);

  return (
    <Container>
      <div className="py-10 max-w-[600px] mx-auto">
        <h2 className="text-main-teal text-lg font-bold">
          Grooming Reservation Change
        </h2>
        <GroomingReservationChange
          previousReservation={previousReservation}
          availableTimes={times}
          reservationId={reservationId}
          currentUser={currentUser}
        />
      </div>
    </Container>
  );
};

export default GroomingChangePage;
