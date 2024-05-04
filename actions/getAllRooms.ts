import prisma from "@/prisma/prismadb";

export default async function getAllRooms() {
  try {
    const rooms = await prisma.room.findMany();
    if (rooms.length !== 0) {
      return rooms;
    }
  } catch (error) {
    console.error(error);
  }
}
