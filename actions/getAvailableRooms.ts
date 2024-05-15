import prisma from '@/prisma/prismadb';

interface SearchQueryType {
  startDate: string;
  endDate: string;
  roomType: string;
}

export default async function getAvailableRooms(searchQuery: SearchQueryType) {
  try {
    

  } catch (error) {
    console.error(error);
  }
}
