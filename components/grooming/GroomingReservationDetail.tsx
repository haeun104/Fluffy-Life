"use client";

import ReactSelectCreatable from "react-select/creatable";
import Button from "../Button";
import { format } from "date-fns";
import { petNames } from "./GroomingReservation";
import { FadeLoader } from "react-spinners";

interface GroomingReservationDetailProps {
  availableTimes: string[] | undefined;
  pets: petNames[] | undefined;
  onChangeTime: (time: string) => void;
  onChangePet: (newValue: petNames | null) => void;
  actionLabel: string;
  handleSubmit: () => void;
  date?: Date;
  time: string;
  petName: string;
}

const GroomingReservationDetail: React.FC<GroomingReservationDetailProps> = ({
  availableTimes,
  pets,
  onChangeTime,
  onChangePet,
  handleSubmit,
  actionLabel,
  date,
  time: selectedTime,
  petName,
}) => {
  return (
    <div className="flex flex-col gap-8 max-w-[410px] md:min-w-[410px]">
      <div>
        <h4 className="mb-4">Select time that you want</h4>
        {!availableTimes ? (
          <div className="flex flex-col justify-center items-center">
            <FadeLoader color="#219C90" />
          </div>
        ) : (
          <div>
            {availableTimes.length === 0 ? (
              <div className="text-sm leading-6">
                There is no time available.
                <br />
                Select other date
              </div>
            ) : (
              <div className="flex gap-4 flex-wrap sm:flex-nowrap">
                {availableTimes.map((time, index) => (
                  <div
                    key={index}
                    className={`border-[1px] rounded-md shadow-md py-2 px-4 cursor-pointer text-sm ${
                      time === selectedTime &&
                      "bg-accent-light-green text-white"
                    }`}
                    onClick={() => onChangeTime(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={`${
          (!availableTimes || availableTimes.length === 0) && "hidden"
        }`}
      >
        <h4 className="mb-4">Input your pet&apos;s name</h4>
        <ReactSelectCreatable
          options={pets}
          isClearable
          onChange={onChangePet}
          placeholder="Select or input pet's name"
        />
      </div>
      {date && selectedTime !== "" && petName !== "" && (
        <div>
          <h4 className="mb-4 text-main-teal font-bold">Reservation summary</h4>
          <div>
            <div className="flex gap-8 items-center">
              <span className="font-bold">{format(date, "dd/MM/yyyy")}</span>
              <span className="font-bold">{selectedTime}</span>
              <span>{petName}</span>
            </div>
            <div className="mt-4">
              <Button
                title={actionLabel}
                style="bg-main-teal"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroomingReservationDetail;
