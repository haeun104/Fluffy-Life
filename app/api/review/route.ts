import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, roomId, reservationId, rating, review } = body;

  const createReview = await prisma.hotelReview.create({
    data: {
      userId,
      roomId,
      reservationId,
      rating,
      review,
    },
  });

  return NextResponse.json(createReview);
}
