"use server";

import prisma from "@/prisma/prismadb";

export default async function getGroomingReservationById(
  reservationId: string
) {
  try {
    const reservation = await prisma.groomingReservation.findUnique({
      where: {
        id: reservationId,
      },
    });

    if (!reservation) {
      return null;
    }

    return reservation;
  } catch (error) {
    console.error(error);
  }
}
