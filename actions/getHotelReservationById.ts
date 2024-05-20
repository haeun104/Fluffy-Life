import prisma from "@/prisma/prismadb";
import { getFormattedDate } from "@/util";

export default async function getHotelReservationById(id: string) {
  try {
    const reservationWithPet = await prisma.hotelReservation.findUnique({
      where: {
        id,
      },
      include: {
        pet: true,
      },
    });

    const hasPet =
      reservationWithPet?.pet !== null && reservationWithPet?.pet !== undefined;

    console.log(hasPet);

    const reservation = await prisma.hotelReservation.findUnique({
      where: {
        id,
      },
      include: {
        pet: hasPet,
        room: true,
        user: true,
      },
    });

    if (!reservation) {
      return null;
    }

    return {
      ...reservation,
      startDate: getFormattedDate(reservation.startDate),
      endDate: getFormattedDate(reservation.endDate),
    };
  } catch (error) {
    console.error(error);
  }
}
