import prisma from "@/prisma/prismadb";

export default async function getGroomingReservations(userId: string) {
  try {
    const reservations = await prisma.groomingReservation.findMany({
      where: {
        userId,
      },
    });

    reservations.sort((a, b) => a.date.getTime() - b.date.getTime());

    return reservations;
  } catch (error) {
    console.error(error);
  }
}
