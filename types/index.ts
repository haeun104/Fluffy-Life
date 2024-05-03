import { User } from "@prisma/client";
import { StaticImageData } from "next/image";

export type UserData = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & { createdAt: string; updatedAt: string; emailVerified: string | null };

export type RoomData = {
  roomId: string;
  roomType: string;
  roomPrice: number;
  groomingPrice?: number;
  groomingInclude: boolean;
  title: string;
  image: StaticImageData;
  description: string;
};
