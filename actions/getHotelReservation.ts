import prisma from "@/prisma/prismadb";

export default async function getHotelReservation(userId: string | null) {
  if (userId !== null) {
    try {
      const reservations = await prisma.hotelReservation.findMany({
        where: {
          userId,
        },
      });
      return reservations;
    } catch (error) {
      console.error(error);
    }
  }
}
