import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import GroomingReservationChange from "@/components/grooming/GroomingReservationChange";

interface GroomingChangeParams {
  reservationId: string;
  date: string;
  time: string;
  petName: string;
}

const GroomingChangePage = async ({
  searchParams,
}: {
  searchParams: GroomingChangeParams;
}) => {
  const currentUser = await getCurrentUser();
  const { reservationId, date, time, petName } = searchParams;

  return (
    <Container>
      <div className="py-10 max-w-[600px] mx-auto">
        <h2 className="text-main-teal text-lg font-bold">
          Grooming Reservation Change
        </h2>
        <GroomingReservationChange
          reservationId={reservationId}
          date={new Date(date)}
          time={time}
          petName={petName}
          currentUser={currentUser}
        />
      </div>
    </Container>
  );
};

export default GroomingChangePage;
