import prisma from "@/prisma/prismadb";

export default async function getHotelReservation(roomId: string) {
  try {
    const reservations = await prisma.hotelReservation.findMany({
      where: {
        roomId: roomId,
      },
    });

    return reservations;
  } catch (error) {
    console.error(error);
  }
}
