import getHotelReservationById from "@/actions/getHotelReservationById";
import Container from "@/components/Container";
import PetReservationInfo from "@/components/reservation/PetReservationInfo";
import Image from "next/image";

interface ReservationDetailParams {
  reservationId: string;
}

const ReservationDetailPage = async ({
  params,
}: {
  params: ReservationDetailParams;
}) => {
  const reservation = await getHotelReservationById(params.reservationId);

  if (reservation) {
    const { imageUrl, roomType, description } = reservation.room;

    return (
      <Container>
        <div className="py-10 max-w-[600px] mx-auto">
          <h2 className="font-bold text-main-teal">Reservation Details</h2>
          <div className="my-4">
            <h3 className="font-bold text-accent-light-green mb-4">Room</h3>
            <div className="flex flex-col gap-2">
              <div className="rounded-md overflow-hidden h-[200px]">
                <Image src={imageUrl} alt={roomType} width={350} height={200} priority/>
              </div>
              <div className="font-bold">{roomType}</div>
              <div className="flex justify-between">
                <h4>Check-in</h4>
                <div>{reservation.startDate}</div>
              </div>
              <div className="flex justify-between">
                <h4>Check-out</h4>
                <div>{reservation.endDate}</div>
              </div>
              <div className="flex justify-between">
                <h4>Total Price</h4>
                <div>{reservation.totalPrice} PLN</div>
              </div>
              <div className="flex flex-col">
                <h4>Room Information</h4>
                <div>{description} </div>
              </div>
              <div className="flex flex-col">
                <h4>Additional Information</h4>
                <div>...</div>
              </div>
            </div>
          </div>
          <PetReservationInfo reservation={reservation} />
        </div>
      </Container>
    );
  }
};

export default ReservationDetailPage;
