"use server";

import prisma from "@/prisma/prismadb";
import { FieldValues } from "react-hook-form";
import { isWithinInterval } from "date-fns";
import { getFormattedDate } from "@/util";
import getAllRooms from "./getAllRooms";

export default async function getAvailableRooms(roomQuery: FieldValues) {
  try {
    const today = new Date();

    const reservations = await prisma.hotelReservation.findMany({
      where: {
        endDate: {
          gt: today,
        },
        room: {
          roomType:
            roomQuery.roomType !== "All" ? roomQuery.roomType : undefined,
        },
      },
      include: {
        room: true,
      },
    });

    let bookedRooms: string[] = [];

    reservations.forEach((reservation) => {
      const startDate = getFormattedDate(reservation.startDate);
      const endDate = getFormattedDate(reservation.endDate);

      const start = isWithinInterval(new Date(startDate), {
        start: new Date(roomQuery.startDate),
        end: new Date(roomQuery.endDate),
      });
      const end = isWithinInterval(new Date(endDate), {
        start: new Date(roomQuery.startDate),
        end: new Date(roomQuery.endDate),
      });

      if (start || end) {
        bookedRooms.push(reservation.roomId);
      }
    });

    if (roomQuery.roomType === "All") {
      const availableRooms = await prisma.room.findMany({
        where: {
          id: {
            notIn: bookedRooms,
          },
        },
      });

      return availableRooms;
    }
    if (bookedRooms.length > 0) {
      return [];
    }

    if (bookedRooms.length === 0) {
      const availableRoom = await prisma.room.findMany({
        where: {
          roomType: roomQuery.roomType,
        },
      });
      return availableRoom;
    }

    const allRooms = await getAllRooms();

    return allRooms;
  } catch (error) {
    console.error(error);
  }
}
