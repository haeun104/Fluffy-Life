import prisma from "@/prisma/prismadb";

export default async function getRoomDetail(id: string) {
  try {
    const room = await prisma.room.findUnique({
      where: {
        id: id,
      },
    });

    return room;
  } catch (error) {
    console.error(error);
  }
}
