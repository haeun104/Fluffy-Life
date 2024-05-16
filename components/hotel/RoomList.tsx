"use client";

import RoomItem from "./RoomItem";
import { RoomData } from "@/types";
import RoomSearchBar from "./RoomSearchBar";
import { useState } from "react";

interface RoomListProps {
  rooms: RoomData[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  const [availableRooms, setAvailableRooms] = useState(rooms);

  const updateAvailableRooms = (rooms: RoomData[]) => {
    setAvailableRooms(rooms);
  };

  return (
    <div>
      <h3 className="text-accent-light-green font-bold mb-2">
        Quick availability check
      </h3>
      <RoomSearchBar updateAvailableRooms={updateAvailableRooms} />
      <div className="flex flex-col gap-4">
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
    </div>
  );
};

export default RoomList;
