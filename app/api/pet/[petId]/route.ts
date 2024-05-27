import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

interface PetRequestParams {
  petId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: PetRequestParams }
) {
  const { petId } = params;

  const deletePet = await prisma.pet.delete({
    where: {
      id: petId,
    },
  });

  return NextResponse.json(deletePet);
}

export async function PUT(
  request: Request,
  { params }: { params: PetRequestParams }
) {
  const { petId } = params;
  const body = await request.json();
  const { breed, age, remark } = body;

  const updatePetInfo = await prisma.pet.update({
    where: {
      id: petId,
    },
    data: {
      breed,
      age,
      remark,
    },
  });

  return NextResponse.json(updatePetInfo);
}

export async function GET(
  request: Request,
  { params }: { params: PetRequestParams }
) {
  const { petId } = params;

  const existingPet = await prisma.pet.findUnique({
    where: {
      chipNumber: petId,
    },
  });

  return NextResponse.json(existingPet);
}
