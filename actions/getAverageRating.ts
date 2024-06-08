import prisma from "@/prisma/prismadb";

export default async function getAverageRating(roomId: string) {
  try {
    const reviews = await prisma.hotelReview.findMany({
      where: {
        roomId,
      },
    });

    if (!reviews) {
      return 0;
    }

    let sum = 0;
    reviews.forEach((review) => (sum += review.rating));
    if (reviews.length === 1 || sum === 0) {
      return sum;
    }

    const fixedRating = parseFloat((sum / reviews.length).toFixed(2));

    return fixedRating;
  } catch (error) {
    console.error(error);
  }
}
