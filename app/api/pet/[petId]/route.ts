import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

interface RequestParams {
  petId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: RequestParams }
) {
  const { petId } = params;

  const deletePet = await prisma.pet.delete({
    where: {
      id: petId,
    },
  });

  return NextResponse.json(deletePet);
}
