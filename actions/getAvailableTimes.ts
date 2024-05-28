"use server";

import prisma from "@/prisma/prismadb";

export default async function getAvailableTimes(date: Date | undefined) {
  const times = ["10:00", "12:00", "14:00", "16:00", "18:00"];

  if (!date) {
    return times;
  }

  try {
    const reservations = await prisma.groomingReservation.findMany({
      where: {
        date,
      },
    });

    if (!reservations) {
      return times;
    }

    let reservedTimes: string[] = [];
    reservations.forEach((reservation) => {
      reservedTimes.push(reservation.time);
    });

    const availableTimes = times.filter(
      (time) => !reservedTimes.includes(time)
    );
    return availableTimes;
  } catch (error) {
    console.error(error);
  }
}
