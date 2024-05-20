import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, roomId, startDate, endDate, totalPrice, petChipNumber, petName } =
    body;

  const reservation = await prisma.hotelReservation.create({
    data: {
      userId,
      roomId,
      startDate,
      endDate,
      totalPrice,
      petName,
      petChipNumber,
    },
  });

  return NextResponse.json(reservation);
}
