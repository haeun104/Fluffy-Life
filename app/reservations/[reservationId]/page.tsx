import Container from "@/components/Container";

interface ReservationDetailParams {
  reservationId: string;
}

const ReservationDetailPage = ({
  params,
}: {
  params: ReservationDetailParams;
}) => {
  return (
    <Container>
      <div>Reservation {params.reservationId}</div>
    </Container>
  );
};

export default ReservationDetailPage;
