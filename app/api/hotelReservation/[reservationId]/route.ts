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

  const deleteReservation = await prisma.hotelReservation.delete({
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
  const body = await request.json();
  const { name, breed, age, chipNumber, remark, userId } = body;

  const { reservationId } = params;

  const updatePetInfo = await prisma.hotelReservation.update({
    where: {
      id: reservationId,
    },
    data: {
      pet: {
        upsert: {
          update: {
            breed,
            age,
            remark,
          },
          create: {
            userId,
            name,
            breed,
            age,
            chipNumber,
            remark,
          },
        },
      },
    },
  });

  return NextResponse.json(updatePetInfo);
}
