import { User } from "@prisma/client";

export type UserData = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & { createdAt: string; updatedAt: string; emailVerified: string | null };

export type RoomData = {
  id: string;
  roomType: string;
  roomPrice: number;
  groomingPrice: number | null;
  groomingInclude: boolean;
  title: string;
  imageUrl: string;
  description: string;
};
