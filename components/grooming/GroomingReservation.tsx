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

interface GroomingReservationProps {
  availableTimes: string[] | undefined;
  currentUser: UserData | null;
  initialDate: Date | undefined;
}

export interface petNames {
  value: string;
  label: string;
}

const GroomingReservation: React.FC<GroomingReservationProps> = ({
  currentUser,
  initialDate,
  availableTimes,
}) => {
  const { submitSearch } = useSearchSubmit();
  const [pets, setPets] = useState<petNames[]>([]);
  const [selectedData, setSelectedData] = useState({
    date: new Date(),
    time: "",
    petName: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!initialDate) {
      setSelectedData((prev) => ({
        ...prev,
        date: new Date(),
      }));
    } else {
      setSelectedData((prev) => ({
        ...prev,
        date: initialDate,
      }));
    }
  }, [initialDate]);

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
    setSelectedData((prev) => ({
      ...prev,
      date,
    }));
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

  const createReservation = async () => {
    if (!currentUser) {
      toast.error("Login first");
      return;
    }
    try {
      const data = {
        ...selectedData,
        userId: currentUser.id,
      };
      await axios.post("/api/grooming", data);
      toast.success("Successfully reserved");
      setSelectedData((prev) => ({
        ...prev,
        date: new Date(),
      }));
      router.push("/");
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
            <GroomingCalendar
              onChange={onChangeDate}
              selectedDate={selectedData.date}
            />
          </div>
        </div>
        <GroomingReservationDetail
          pets={pets}
          availableTimes={availableTimes}
          selectedData={selectedData}
          onChangeTime={onChangeTime}
          onChangePet={onChangePet}
          actionLabel="Reserve"
          handleSubmit={createReservation}
        />
      </div>
    </div>
  );
};

export default GroomingReservation;
