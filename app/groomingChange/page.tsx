import Container from "@/components/Container";
import GroomingReservationChange from "@/components/grooming/GroomingReservationChange";

interface GroomingChangeParams {
  reservationId: string;
  date: Date;
  time: string;
  petName: string;
}

const GroomingChangePage = ({
  searchParams,
}: {
  searchParams: GroomingChangeParams;
}) => {
  const { reservationId, date, time, petName } = searchParams;

  return (
    <Container>
      <div className="py-10 max-w-[600px] mx-auto">
        <h2 className="text-main-teal text-lg font-bold">
          Grooming Reservation Change
        </h2>
        <GroomingReservationChange
          reservationId={reservationId}
          date={date}
          time={time}
          petName={petName}
        />
      </div>
    </Container>
  );
};

export default GroomingChangePage;
