import prisma from "@/prisma/prismadb";

export default async function getPetInfoByChipNumber(chipNumber: string) {
  try {
    const petInfo = await prisma.pet.findUnique({
      where: {
        chipNumber,
      },
    });

    return petInfo;
  } catch (error) {
    console.error(error);
  }
}
