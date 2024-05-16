"use client";

import RoomItem from "./RoomItem";
import { RoomData } from "@/types";
import RoomSearchBar from "./RoomSearchBar";
import { useState } from "react";

interface RoomListProps {
  rooms: RoomData[] | undefined;
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  const [availableRooms, setAvailableRooms] = useState(rooms);

  const updateAvailableRooms = (rooms: RoomData[] | undefined) => {
    setAvailableRooms(rooms);
  };

  if (rooms && availableRooms) {
    return (
      <div>
        <h3 className="text-accent-light-green font-bold mb-2">
          Quick availability check
        </h3>
        <RoomSearchBar updateAvailableRooms={updateAvailableRooms} />
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
      </div>
    );
  }
};

export default RoomList;
