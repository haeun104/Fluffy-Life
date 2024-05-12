import prisma from "@/prisma/prismadb";

export default async function getHotelReviews(userId: string) {
  try {
    const checkExistingReview = await prisma.hotelReview.findMany({
      where: {
        userId,
      },
    });

    return checkExistingReview;
    
  } catch (error) {
    console.error(error);
  }
}
