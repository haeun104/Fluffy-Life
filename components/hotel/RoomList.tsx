"use client";

import RoomItem from "./RoomItem";
import { RoomData } from "@/types";
import RoomSearchBar from "./RoomSearchBar";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import getAvailableRooms, {
  RoomSearchParams,
} from "@/actions/getAvailableRooms";

interface RoomListProps {
  searchParams: RoomSearchParams;
}

const RoomList: React.FC<RoomListProps> = ({ searchParams }) => {
  const [availableRooms, setAvailableRooms] = useState<
    RoomData[] | undefined
  >();

  useEffect(() => {
    const checkAvailableRooms = async (params: RoomSearchParams) => {
      const rooms = await getAvailableRooms(params);
      return rooms;
    };

    const fetchRooms = async () => {
      const availableRooms = await checkAvailableRooms(searchParams);
      setAvailableRooms(availableRooms);
    };

    fetchRooms();
  }, [searchParams]);

  return (
    <div>
      <h3 className="text-accent-light-green font-bold mb-2">
        Quick availability check
      </h3>
      <RoomSearchBar
        startDate={searchParams.startDate}
        endDate={searchParams.endDate}
        roomType={searchParams.roomType}
      />
      {!availableRooms ? (
        <div className="h-[350px] flex justify-center items-center">
          <FadeLoader color="#219C90" />
        </div>
      ) : (
        <>
          {availableRooms.length === 0 ? (
            <div className="mt-10">
              <h4 className="text-center">
                There is no room available for this period
              </h4>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-4">
              {availableRooms.map((room) => (
                <RoomItem
                  key={room.id}
                  id={room.id}
                  roomType={room.roomType}
                  roomPrice={room.roomPrice}
                  groomingInclude={room.groomingInclude}
                  groomingPrice={room.groomingPrice}
                  title={room.title}
                  imageUrl={room.imageUrl}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RoomList;
