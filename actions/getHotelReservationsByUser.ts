"use server";

import { HotelReservation } from "@/components/reservation/HotelReservations";
import prisma from "@/prisma/prismadb";
import { HotelReview } from "@prisma/client";

export default async function getHotelReservationsByUser(
  userId: string | null,
  skip?: number,
  take?: number
) {
  if (userId !== null) {
    try {
      const reservationsWithReviews: (HotelReservation & {
        review: HotelReview | undefined;
      })[] = [];

      const reservations = await prisma.hotelReservation.findMany({
        where: {
          userId,
        },
        include: {
          room: true,
        },
        orderBy: {
          startDate: "desc",
        },
        skip: skip,
        take: take,
      });

      if (reservations.length > 0) {
        reservations.sort(
          (a, b) => b.startDate.getTime() - a.startDate.getTime()
        );

        const reservationIds = reservations.map(
          (reservation) => reservation.id
        );

        const reviews = await prisma.hotelReview.findMany({
          where: {
            reservationId: {
              in: reservationIds,
            },
          },
        });

        reservations.forEach((reservation) => {
          const matchingReview = reviews.find(
            (review) => review.reservationId === reservation.id
          );
          reservationsWithReviews.push({
            ...reservation,
            review: matchingReview,
          });
        });
      }

      return reservationsWithReviews;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
