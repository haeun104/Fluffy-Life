import prisma from "@/prisma/prismadb";

export default async function getHotelReviews(
  roomIdOrUserId: string,
  byUser: boolean
) {
  try {
    const query = byUser
      ? { userId: roomIdOrUserId }
      : { roomId: roomIdOrUserId };
    const checkExistingReview = await prisma.hotelReview.findMany({
      where: query,
    });
    return checkExistingReview;
    
  } catch (error) {
    console.error(error);
  }
}
