import prisma from "@/prisma/prismadb";

export default async function getReservationCount(
  type: string,
  userId: string
) {
  try {
    if (type === "hotel") {
      const reservations = await prisma.hotelReservation.findMany({
        where: {
          userId,
        },
      });

      if (!reservations) {
        return 0;
      }

      return reservations.length;
    }
    if (type === "grooming") {
      const reservations = await prisma.groomingReservation.findMany({
        where: {
          userId,
        },
      });

      if (!reservations) {
        return 0;
      }

      return reservations.length;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
}
