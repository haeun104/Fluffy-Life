"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { Calendar } from "react-date-range";

const GroomingCalendar = () => {
  return <Calendar minDate={new Date()} />;
};

export default GroomingCalendar;
