import prisma from "@/prisma/prismadb";

export default async function getHotelReviews(
  roomIdOrUserId: string,
  byUser: boolean
) {
  try {
    const query = byUser
      ? { userId: roomIdOrUserId }
      : { roomId: roomIdOrUserId };
    const reviews = await prisma.hotelReview.findMany({
      where: query,
      include: {
        user: true,
      },
    });
    return reviews;
  } catch (error) {
    console.error(error);
  }
}
