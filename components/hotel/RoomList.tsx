"use client";

import RoomItem from "./RoomItem";
import { RoomData } from "@/types";
import RoomSearchBar from "./RoomSearchBar";

interface RoomListProps {
  rooms: RoomData[] | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  roomType: string | undefined;
}

const RoomList: React.FC<RoomListProps> = ({
  rooms,
  startDate,
  endDate,
  roomType,
}) => {
  if (rooms) {
    return (
      <div>
        <h3 className="text-accent-light-green font-bold mb-2">
          Quick availability check
        </h3>
        <RoomSearchBar
          startDate={startDate}
          endDate={endDate}
          roomType={roomType}
        />
        {rooms.length === 0 ? (
          <div className="mt-10">
            <h4 className="text-center">
              There is no room available for this period
            </h4>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            {rooms.map((room) => (
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
      </div>
    );
  }
};

export default RoomList;
