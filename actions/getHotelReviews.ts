"use server";

import prisma from "@/prisma/prismadb";

export default async function getHotelReviews(
  roomIdOrUserId: string,
  byUser: boolean,
  skip?: number,
  take?: number
) {
  try {
    const query = byUser
      ? { userId: roomIdOrUserId }
      : { roomId: roomIdOrUserId };

    const reviews = await prisma.hotelReview.findMany({
      where: query,
      include: {
        user: true,
        room: true,
      },
      skip: skip,
      take: take,
    });

    return reviews || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
