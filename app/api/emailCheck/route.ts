import prisma from "@/prisma/prismadb";

export default async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  try {
    const userEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!userEmail) {
      return {
        status: 404,
        message: "Email doesn't exist",
      };
    }

    return {
      status: 200,
      message: "Email already exists",
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
