import prisma from "@/prisma/prismadb";

export default async function getHotelReservationsByUser(
  userId: string | null
) {
  if (userId !== null) {
    try {
      const reservations = await prisma.hotelReservation.findMany({
        where: {
          userId,
        },
        include: {
          room: true,
        },
      });
      return reservations;
    } catch (error) {
      console.error(error);
    }
  }
}
