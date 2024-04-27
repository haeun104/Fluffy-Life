import prisma from "@/prisma/prismadb";

export default async function getExistingEmail(email: string) {
  try {
    const userEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userEmail) {
      return false;
    }

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}
