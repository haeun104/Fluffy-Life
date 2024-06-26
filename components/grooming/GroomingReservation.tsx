"use client";

import useSearchSubmit from "@/hooks/useSearchSubmit";
import GroomingCalendar from "./GroomingCalendar";
import { getFormattedDate } from "@/util";
import { useEffect, useState } from "react";
import { UserData } from "@/types";
import getPets from "@/actions/getPets";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import GroomingReservationDetail from "./GroomingReservationDetail";
import getAvailableTimes from "@/actions/getAvailableTimes";
import { GroomingSearchParams } from "@/app/grooming/page";

interface GroomingReservationProps {
  currentUser: UserData | null;
  searchParams: GroomingSearchParams;
}

export interface petNames {
  value: string;
  label: string;
}

const GroomingReservation: React.FC<GroomingReservationProps> = ({
  currentUser,
  searchParams,
}) => {
  const { submitSearch } = useSearchSubmit();
  const [pets, setPets] = useState<petNames[]>([]);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [petName, setPetName] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>();

  const router = useRouter();

  useEffect(() => {
    const fetchTimes = async (selectedDate: Date) => {
      const times = await getAvailableTimes(selectedDate);
      return times;
    };

    const updateAvailableTimes = async () => {
      if (searchParams && searchParams.date) {
        console.log(searchParams.date);
        const availableTimes = await fetchTimes(searchParams.date);
        setAvailableTimes(availableTimes);
        setDate(searchParams.date)
        return;
      }
    };

    updateAvailableTimes();
  }, [searchParams]);

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

  const onChangeDate = (date: Date) => {
    setDate(date);
    const queryData = {
      service: "grooming",
      startDate: "",
      endDate: "",
      date: getFormattedDate(date),
    };
    submitSearch(queryData);
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

  const createReservation = async () => {
    if (!currentUser) {
      toast.error("Login first");
      return;
    }
    try {
      const data = {
        date,
        time,
        petName,
        userId: currentUser.id,
      };
      await axios.post("/api/grooming", data);
      toast.success("Successfully reserved");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to reserve");
      console.error(error);
    }
  };

  return (
    <div className="mt-10 ">
      <h3 className="text-accent-light-green font-bold mb-4">Reservation</h3>
      <div className="flex flex-col gap-8 md:flex-row md:gap-10">
        <div className="">
          <h4 className="mb-4">Select date for service</h4>
          <div className="border-[1px] max-w-[350px] rounded-md flex justify-center overflow-hidden shadow-md lg:w-[350px]">
            <GroomingCalendar onChange={onChangeDate} selectedDate={date} />
          </div>
        </div>
        {date && (
          <GroomingReservationDetail
            pets={pets}
            availableTimes={availableTimes}
            onChangeTime={onChangeTime}
            onChangePet={onChangePet}
            actionLabel="Reserve"
            handleSubmit={createReservation}
            date={date}
            petName={petName}
            time={time}
          />
        )}
      </div>
    </div>
  );
};

export default GroomingReservation;
