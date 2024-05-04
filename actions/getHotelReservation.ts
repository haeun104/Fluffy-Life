import prisma from "@/prisma/prismadb";

export default async function getHotelReservation(roomId: string) {
  try {
    const reservations = await prisma.hotelReservation.findMany({
      where: {
        roomId: roomId,
      },
    });
    if (reservations.length === 0) {
      return null;
    }

    return reservations;
  } catch (error) {
    console.error(error);
  }
}
