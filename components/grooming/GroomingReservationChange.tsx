"use client";

import { addHours, format, formatISO } from "date-fns";
import GroomingCalendar from "./GroomingCalendar";
import { useEffect, useState } from "react";
import { petNames } from "./GroomingReservation";
import GroomingReservationDetail from "./GroomingReservationDetail";
import { UserData } from "@/types";
import getPets from "@/actions/getPets";
import { useRouter } from "next/navigation";
import { GroomingReservation } from "@prisma/client";
import queryString from "query-string";
import axios from "axios";
import toast from "react-hot-toast";
import getAvailableTimes from "@/actions/getAvailableTimes";

interface GroomingReservationChangeProps {
  previousReservation: GroomingReservation | null | undefined;
  reservationId: string;
  newDate: Date;
  currentUser: UserData | null;
}

const GroomingReservationChange: React.FC<GroomingReservationChangeProps> = ({
  previousReservation,
  reservationId,
  newDate,
  currentUser,
}) => {
  const [pets, setPets] = useState<petNames[]>([]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [petName, setPetName] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>();

  useEffect(() => {
    const fetchTimes = async (selectedDate: Date) => {
      const times = await getAvailableTimes(selectedDate);
      return times;
    };

    const updateAvailableTimes = async () => {
      if (newDate) {
        console.log(newDate);
        const availableTimes = await fetchTimes(newDate);
        setAvailableTimes(availableTimes);
        setDate(newDate);
        return;
      }
    };

    updateAvailableTimes();
  }, [newDate]);

  const router = useRouter();

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
    const cetDate = addHours(date, 2);
    let query = {
      reservationId,
      date: formatISO(cetDate),
    };

    const url = queryString.stringifyUrl(
      {
        url: "/groomingChange",
        query: query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const onChangePet = (newValue: petNames | null) => {
    if (newValue === null) {
      setPetName("");
    } else {
      setPetName(newValue.value);
    }
  };

  const onChangeTime = (time: string) => {
    setTime(time);
  };

  const handleChangeClick = async () => {
    try {
      const dataToUpdate = {
        date,
        time,
        petName,
      };
      await axios.put(`/api/grooming/${reservationId}`, dataToUpdate);
      toast.success("Successfully changed");
      router.push("/reservations");
      router.refresh();
    } catch (error) {
      toast.error("Failed to change");
      console.error(error);
    }
  };

  return (
    <div className="mt-4">
      <div>
        <h3 className="font-bold text-accent-light-green">
          Reservation before change
        </h3>
        <div className="flex gap-4 my-4">
          {previousReservation && (
            <>
              <span className="font-bold">
                {format(previousReservation.date, "dd/MM/yyyy")}
              </span>
              <span className="font-bold">{previousReservation.time}</span>
              <span>{previousReservation.petName}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-10 mt-8">
        <div>
          <h4 className="mb-4">Select new date</h4>
          <div className="border-[1px] max-w-[350px] rounded-md flex justify-center overflow-hidden shadow-md lg:w-[350px]">
            <GroomingCalendar selectedDate={date} onChange={onChangeDate} />
          </div>
        </div>
        {date && (
          <GroomingReservationDetail
            availableTimes={availableTimes}
            date={date}
            petName={petName}
            time={time}
            pets={pets}
            onChangeTime={onChangeTime}
            onChangePet={onChangePet}
            actionLabel="Change"
            handleSubmit={handleChangeClick}
          />
        )}
      </div>
    </div>
  );
};

export default GroomingReservationChange;
