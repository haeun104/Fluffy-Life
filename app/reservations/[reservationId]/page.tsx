import getHotelReservationById from "@/actions/getHotelReservationById";
import Container from "@/components/Container";
import { roomDescription } from "@/components/hotel/RoomReservation";
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
    const { imageUrl, roomType } = reservation.room;
    const descriptions = roomDescription.filter((item) =>
      item.rooms.includes(roomType)
    );

    return (
      <Container>
        <div className="py-10 max-w-[600px] mx-auto">
          <h2 className="font-bold text-main-teal">Reservation Details</h2>
          <div className="my-4">
            <h3 className="font-bold text-accent-light-green mb-4">Room</h3>
            <div className="flex flex-col gap-2">
              <div className="rounded-md overflow-hidden h-[200px] relative">
                <Image src={imageUrl} alt={roomType} fill priority />
              </div>
              <div className="font-bold mt-4">{roomType}</div>
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
              <div className="my-4">
                <h4 className="mb-2 font-bold">Services included</h4>
                <div className="flex flex-col gap-4 sm:flex-row sm:grid sm:grid-cols-2">
                  {descriptions.map((description, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Image
                        src={description.icon}
                        alt={description.description}
                        height={30}
                        width={30}
                      />
                      <p>{description.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-4 font-bold">Additional Information</h4>
                <div className="flex flex-col">
                  <span>Check-in after 2:00 PM</span>
                  <span>Check-out before 11:00 PM</span>
                </div>
                <div className="flex flex-col mt-4">
                  <span>
                    Cancellation is possible up to 48 hours before the
                    reservation date.
                  </span>
                  <span>
                    Date changes can only be made by canceling the reservation
                    and re-booking.
                  </span>
                </div>
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
