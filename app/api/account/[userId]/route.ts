import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const body = await request.json();
  const { name, email, street, city, postalCode, mobile } = body;

  const updatePersonalInfo = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,
      street,
      city,
      postalCode,
      mobile,
    },
  });

  return NextResponse.json(updatePersonalInfo);
}
