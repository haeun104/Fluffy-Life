"use client";

import useSearchSubmit from "@/hooks/useSearchSubmit";
import GroomingCalendar from "./GroomingCalendar";
import { getFormattedDate } from "@/util";
import { useEffect, useState } from "react";
import ReactSelectCreatable from "react-select/creatable";
import { UserData } from "@/types";
import getPets from "@/actions/getPets";
import Button from "../Button";

interface GroomingReservationProps {
  availableTimes: string[] | undefined;
  currentUser: UserData | null;
  initialDate: string | undefined;
}

interface petNames {
  value: string;
  label: string;
}

const GroomingReservation: React.FC<GroomingReservationProps> = ({
  availableTimes,
  currentUser,
  initialDate,
}) => {
  const { submitSearch } = useSearchSubmit();
  const [pets, setPets] = useState<petNames[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPet, setSelectedPet] = useState("");

  useEffect(() => {
    if (!initialDate) {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(new Date(initialDate));
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
    setSelectedDate(date);
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
      setSelectedPet("");
    } else {
      setSelectedPet(newValue.value);
    }
  };

  return (
    <div>
      <h3 className="text-accent-light-green font-bold mb-4">Reservation</h3>
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-4">
        <div className="">
          <h4 className="mb-4">Select date for service</h4>
          <div className="border-[1px] rounded-md flex justify-center overflow-hidden shadow-md">
            <GroomingCalendar
              onChange={onChangeDate}
              selectedDate={selectedDate}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <h4 className="mb-4">Select time that you want</h4>
            <div className="flex gap-4 flex-wrap sm:flex-nowrap">
              {availableTimes &&
                availableTimes.map((time, index) => (
                  <div
                    key={index}
                    className={`border-[1px] rounded-md shadow-md py-2 px-4 cursor-pointer text-sm ${
                      time === selectedTime &&
                      "bg-accent-light-green text-white"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4">Input your pet&apos;s name</h4>
            <ReactSelectCreatable
              options={pets}
              isClearable
              onChange={onChangePet}
              placeholder="Select or input pet's name"
            />
          </div>
          {selectedDate && selectedTime !== "" && selectedPet !== "" && (
            <div>
              <h4 className="mb-4 text-main-teal font-bold">
                Reservation summary
              </h4>
              <div>
                <div className="flex gap-8 items-center">
                  <span className="font-bold">
                    {getFormattedDate(selectedDate)}
                  </span>
                  <span className="font-bold">{selectedTime}</span>
                  <span>{selectedPet}</span>
                </div>
                <div className="mt-4">
                  <Button title="Reserve" style="bg-main-teal" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroomingReservation;
