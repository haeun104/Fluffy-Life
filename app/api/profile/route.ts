import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { mobile, street, city, postalCode, userId } = body;

  const updateProfile = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      mobile,
      street,
      city,
      postalCode,
    },
  });

  return NextResponse.json(updateProfile);
}
