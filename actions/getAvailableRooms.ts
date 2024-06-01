"use server";

import prisma from "@/prisma/prismadb";

export interface RoomSearchParams {
  roomType?: string;
  startDate?: string;
  endDate?: string;
}

export default async function getAvailableRooms(params: RoomSearchParams) {
  try {
    if (!params) {
      const allRooms = await prisma.room.findMany();
      return allRooms;
    }

    const { roomType, startDate, endDate } = params;

    let query: any = {};

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      query.reservation = {
        none: {
          OR: [
            {
              startDate: { lte: end },
              endDate: { gte: start },
            },
          ],
        },
      };
    }
    if (roomType && roomType !== "All") {
      query.roomType = roomType;
    }

    const availableRooms = await prisma.room.findMany({
      where: query,
    });

    return availableRooms;
  } catch (error) {
    console.error(error);
  }
}
