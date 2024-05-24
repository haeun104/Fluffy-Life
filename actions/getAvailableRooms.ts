"use server";

import prisma from "@/prisma/prismadb";

export interface RoomSearchParams {
  roomType?: string;
  startDate?: string;
  endDate?: string;
}

export default async function getAvailableRooms(params: RoomSearchParams) {
  try {
    const { roomType, startDate, endDate } = params;

    let query: any = {};

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      query.NOT = {
        reservation: {
          some: {
            OR: [
              {
                endDate: { gte: start },
                startDate: { lte: start },
              },
              {
                startDate: { lte: end },
                endDate: { gte: end },
              },
            ],
          },
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
