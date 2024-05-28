"use client";

import ReactSelectCreatable from "react-select/creatable";
import Button from "../Button";
import { format } from "date-fns";
import { petNames } from "./GroomingReservation";

interface SelectedReservationData {
  date: Date;
  time: string;
  petName: string;
}

interface GroomingReservationDetailProps {
  availableTimes: string[] | undefined;
  selectedData: SelectedReservationData;
  pets: petNames[] | undefined;
  onChangeTime: (time: string) => void;
  onChangePet: (newValue: petNames | null) => void;
  actionLabel: string;
  handleSubmit: () => void;
}

const GroomingReservationDetail: React.FC<GroomingReservationDetailProps> = ({
  selectedData,
  availableTimes,
  pets,
  onChangeTime,
  onChangePet,
  handleSubmit,
  actionLabel,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="mb-4">Select time that you want</h4>
        <div className="flex gap-4 flex-wrap sm:flex-nowrap">
          {availableTimes &&
            availableTimes.map((time, index) => (
              <div
                key={index}
                className={`border-[1px] rounded-md shadow-md py-2 px-4 cursor-pointer text-sm ${
                  time === selectedData.time &&
                  "bg-accent-light-green text-white"
                }`}
                onClick={() => onChangeTime(time)}
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
      {selectedData.date &&
        selectedData.time !== "" &&
        selectedData.petName !== "" && (
          <div>
            <h4 className="mb-4 text-main-teal font-bold">
              Reservation summary
            </h4>
            <div>
              <div className="flex gap-8 items-center">
                <span className="font-bold">
                  {format(selectedData.date, "dd/MM/yyyy")}
                </span>
                <span className="font-bold">{selectedData.time}</span>
                <span>{selectedData.petName}</span>
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
