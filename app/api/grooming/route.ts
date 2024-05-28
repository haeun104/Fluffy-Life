import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, petName, date, time } = body;

  const createdReservation = await prisma.groomingReservation.create({
    data: {
      userId,
      petName,
      date,
      time,
    },
  });

  return NextResponse.json(createdReservation);
}
