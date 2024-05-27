import { GroomingSearchParams } from "@/app/grooming/page";
import prisma from "@/prisma/prismadb";

export default async function getAvailableTimes(params: GroomingSearchParams) {
  const { date } = params;

  const times = ["10:00", "12:00", "14:00", "16:00", "18:00"];

  if (!date) {
    return times;
  }

  try {
    const selectedDate = new Date(date);

    const reservations = await prisma.groomingReservation.findMany({
      where: {
        date: selectedDate,
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
