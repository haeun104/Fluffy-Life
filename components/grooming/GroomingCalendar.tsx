"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { Calendar } from "react-date-range";

interface GroomingCalendarProps {
  onChange: (date: Date) => void;
  selectedDate: Date | undefined;
}

const GroomingCalendar: React.FC<GroomingCalendarProps> = ({
  onChange,
  selectedDate,
}) => {
  return (
    <Calendar
      minDate={new Date()}
      onChange={onChange}
      date={selectedDate}
      showDateDisplay={false}
    />
  );
};

export default GroomingCalendar;
