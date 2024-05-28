"use client";

import { format } from "date-fns";
import GroomingCalendar from "./GroomingCalendar";
import { useEffect, useState } from "react";
import { petNames } from "./GroomingReservation";
import GroomingReservationDetail from "./GroomingReservationDetail";
import { UserData } from "@/types";
import getPets from "@/actions/getPets";
import { useRouter } from "next/navigation";
import getAvailableTimes from "@/actions/getAvailableTimes";

interface GroomingReservationChangeProps {
  reservationId: string;
  date: Date;
  time: string;
  petName: string;
  currentUser: UserData | null;
}

const GroomingReservationChange: React.FC<GroomingReservationChangeProps> = ({
  reservationId,
  date,
  time,
  petName,
  currentUser,
}) => {
  const [pets, setPets] = useState<petNames[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>();
  const [selectedData, setSelectedData] = useState({
    date,
    time: "",
    petName: "",
  });

  const router = useRouter();

  const fetchTimes = async (date: Date) => {
    const times = await getAvailableTimes(date);
    return times;
  };

  useEffect(() => {
    const loadTimes = async () => {
      const availableTimes = await fetchTimes(selectedData.date);
      setAvailableTimes(availableTimes);
    };

    loadTimes();
  }, [selectedData.date]);

  useEffect(() => {
    const fetchPets = async (userId: string) => {
      const pets = await getPets(userId);
      let petNames: petNames[] = [];
      pets?.forEach((pet) => {
        petNames.push({
          value: pet.name,
          label: pet.name,
        });
      });
      return petNames;
    };

    const loadPets = async () => {
      if (currentUser !== null) {
        const pets = await fetchPets(currentUser.id);
        setPets(pets);
      }
    };

    loadPets();
  }, [currentUser]);

  const onChangeDate = async (date: Date) => {
    setSelectedData((prev) => ({
      ...prev,
      date,
    }));
  };

  const onChangePet = (newValue: petNames | null) => {
    if (newValue === null) {
      setSelectedData((prev) => ({
        ...prev,
        petName: "",
      }));
    } else {
      setSelectedData((prev) => ({
        ...prev,
        petName: newValue.value,
      }));
    }
  };

  const onChangeTime = (time: string) => {
    setSelectedData((prev) => ({
      ...prev,
      time,
    }));
  };

  const handleChangeClick = () => {};

  return (
    <div className="mt-4">
      <div>
        <h3 className="font-bold text-accent-light-green">
          Reservation before change
        </h3>
        <div className="flex gap-4 my-4">
          <span className="font-bold">{format(date, "dd/MM/yyyy")}</span>
          <span className="font-bold">{time}</span>
          <span>{petName}</span>
        </div>
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-10 mt-8">
        <div>
          <h4 className="mb-4">Select new date</h4>
          <div className="border-[1px] max-w-[350px] rounded-md flex justify-center overflow-hidden shadow-md lg:w-[350px]">
            <GroomingCalendar
              selectedDate={selectedData.date}
              onChange={onChangeDate}
            />
          </div>
        </div>
        <GroomingReservationDetail
          availableTimes={availableTimes}
          selectedData={selectedData}
          pets={pets}
          onChangeTime={onChangeTime}
          onChangePet={onChangePet}
          actionLabel="Change"
          handleSubmit={handleChangeClick}
        />
      </div>
    </div>
  );
};

export default GroomingReservationChange;
