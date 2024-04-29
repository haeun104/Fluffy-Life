import prisma from "@/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return NextResponse.error();
  }

  const userEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return NextResponse.json(userEmail);
}
