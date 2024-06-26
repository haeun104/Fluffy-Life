import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

interface HotelReviewParams {
  reviewId: string;
}

export async function PUT(
  request: Request,
  { params }: { params: HotelReviewParams }
) {
  const body = await request.json();
  const { rating, review } = body;

  const { reviewId } = params;

  const updateReview = await prisma.hotelReview.update({
    where: {
      id: reviewId,
    },
    data: {
      rating,
      review,
    },
  });

  return NextResponse.json(updateReview);
}

export async function DELETE(
  request: Request,
  { params }: { params: HotelReviewParams }
) {
  const { reviewId } = params;

  const deleteReview = await prisma.hotelReview.delete({
    where: {
      id: reviewId,
    },
  });

  return NextResponse.json(deleteReview);
}
