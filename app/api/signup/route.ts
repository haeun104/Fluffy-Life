import bcrypt from "bcrypt";

import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const isExistingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isExistingEmail) {
    return NextResponse.json(
      { error: "The email already exists." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
