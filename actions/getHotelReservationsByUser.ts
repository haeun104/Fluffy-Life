"use server";

import { HotelReservation } from "@/components/reservation/HotelReservations";
import prisma from "@/prisma/prismadb";
import { HotelReview } from "@prisma/client";

export default async function getHotelReservationsByUser(
  userId: string | null,
  skip: number,
  currentCount: number = 0
) {
  if (userId !== null) {
    try {
      const reservationsWithReviews: (HotelReservation & {
        review: HotelReview | undefined;
      })[] = [];

      // Fetch 3 next reservations from DB
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
        skip,
        take: 3,
      });

      if (reservations.length > 0) {
        reservations.sort(
          (a, b) => b.startDate.getTime() - a.startDate.getTime()
        );

        const reservationIds = reservations.map(
          (reservation) => reservation.id
        );

        // Fetch reviews on 3 reservations from DB if existing
        const reviews = await prisma.hotelReview.findMany({
          where: {
            reservationId: {
              in: reservationIds,
            },
          },
        });

        // Combine fetched reservations ans their reviews
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

      // Check total count of user's reservation
      let hasMoreReservations = false;

      const allReservations = await prisma.hotelReservation.findMany({
        where: {
          userId,
        },
      });

      const count = allReservations.length - reservations.length - currentCount;

      if (count && count > 0) {
        hasMoreReservations = true;
      }

      return {
        reservationsWithReviews,
        hasMoreReservations,
      };
    } catch (error) {
      console.error(error);
      return {
        reservationsWithReviews: [],
        hasMoreReservations: false,
      };
    }
  }
}
