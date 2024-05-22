import { Pet, Room, User } from "@prisma/client";

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

export interface RoomReview {
  id: string;
  userId: string;
  roomId: string;
  reservationId: string;
  rating: number;
  review: string;
  createdAt: Date;
  user: User;
  room: Room;
}

export interface HotelReservationData {
  id: string;
  userId: string;
  roomId: string;
  petName: string;
  petChipNumber: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: Date;
  user: User;
  room: Room;
  pet: Pet;
}
