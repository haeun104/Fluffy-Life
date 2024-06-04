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

  return (
    <Container>
      <div className="py-10 max-w-[350px] sm:max-w-[800px] mx-auto">
        <h2 className="text-main-teal text-lg font-bold">
          Grooming Reservation Change
        </h2>
        <GroomingReservationChange
          previousReservation={previousReservation}
          reservationId={reservationId}
          newDate={date}
          currentUser={currentUser}
        />
      </div>
    </Container>
  );
};

export default GroomingChangePage;
