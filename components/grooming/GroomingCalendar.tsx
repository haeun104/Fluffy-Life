"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { Calendar } from "react-date-range";

interface GroomingCalendarProps {
  onChange: (date: Date) => void;
}

const GroomingCalendar: React.FC<GroomingCalendarProps> = ({ onChange }) => {
  return <Calendar minDate={new Date()} onChange={onChange} />;
};

export default GroomingCalendar;
