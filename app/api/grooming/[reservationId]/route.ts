import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

interface ReservationParams {
  reservationId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: ReservationParams }
) {
  const { reservationId } = params;

  const deleteReservation = await prisma.groomingReservation.delete({
    where: {
      id: reservationId,
    },
  });

  return NextResponse.json(deleteReservation);
}

export async function PUT(
  request: Request,
  { params }: { params: ReservationParams }
) {
  const { reservationId } = params;
  const body = await request.json();
  const { date, time, petName } = body;

  const updateReservation = await prisma.groomingReservation.update({
    where: {
      id: reservationId,
    },
    data: {
      date,
      time,
      petName,
    },
  });

  return NextResponse.json(updateReservation);
}
