import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, name, breed, age, chipNumber, remark, id } = body;

  const existingPet = await prisma.pet.findUnique({
    where: {
      chipNumber,
    },
  });

  if (existingPet) {
    const updatePet = await prisma.pet.update({
      where: {
        id,
      },
      data: {
        name,
        breed,
        age,
        remark,
      },
    });
    return NextResponse.json(updatePet);
  } else {
    const createPet = await prisma.pet.create({
      data: {
        userId,
        name,
        breed,
        age,
        chipNumber,
        remark,
      },
    });
    return NextResponse.json(createPet);
  }
}
