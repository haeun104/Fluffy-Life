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
