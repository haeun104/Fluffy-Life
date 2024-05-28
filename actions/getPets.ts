"use server";

import prisma from "@/prisma/prismadb";

export default async function getPets(userId: string) {
  try {
    const pets = prisma.pet.findMany({
      where: {
        userId,
      },
    });

    return pets;
  } catch (error) {
    console.error(error);
  }
}
