import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, name, breed, age, chipNumber, remark } = body;

  const existingPet = await prisma.pet.findUnique({
    where: {
      chipNumber,
    },
  });

  if (existingPet) {
    return NextResponse.json({ error: "Pet already exists" }, { status: 400 });
  }

  if (!existingPet) {
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
