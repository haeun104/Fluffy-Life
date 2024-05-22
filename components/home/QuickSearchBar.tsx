"use client";

import { FieldError, useForm } from "react-hook-form";
import { getFormattedDate } from "@/util";
import { IoMdSearch } from "react-icons/io";

const QuickSearchBar = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      service: "hotel",
      startDate: "",
      endDate: "",
      date: "",
    },
  });

  const service = watch("service");

  return (
    <div className="text-main-gray flex mx-auto">
      <div className="flex gap-2 bg-main-gray rounded-xl px-2 py-1 text-white text-xs sm:text-sm">
        <div className="flex flex-col text-start">
          <label htmlFor="startDate" className="text-xs indent-1">
            Service
          </label>
          <select
            id="service"
            {...register("service", { required: true })}
            className="border-neutral-300 outline-none bg-main-gray"
          >
            <option value="hotel">Hotel</option>
            <option value="grooming">Grooming</option>
          </select>

          {errors["service"] && (
            <span className="text-accent-red text-sm">
              {(errors["service"] as FieldError).message}
            </span>
          )}
        </div>
        {service === "hotel" ? (
          <>
            <div className="flex flex-col text-start">
              <label htmlFor="startDate" className="text-xs">
                Check-in
              </label>
              <input
                type="date"
                id="startDate"
                {...register("startDate", { required: true })}
                className="border-neutral-300 outline-none  bg-main-gray"
                disabled={isSubmitting}
                min={getFormattedDate(new Date())}
              />
              {errors["startDate"] && (
                <span className="text-accent-red text-sm">
                  {(errors["startDate"] as FieldError).message}
                </span>
              )}
            </div>
            <div className="flex flex-col text-start">
              <label htmlFor="startDate" className="text-xs">
                Check-out
              </label>
              <input
                type="date"
                id="endDate"
                {...register("endDate", { required: true })}
                className="border-neutral-300 outline-none bg-main-gray"
                disabled={isSubmitting}
                min={getFormattedDate(new Date())}
              />
              {errors["endDate"] && (
                <span className="text-accent-red text-sm">
                  {(errors["endDate"] as FieldError).message}
                </span>
              )}
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col text-start">
            <label htmlFor="startDate" className="text-xs">
              Date
            </label>
            <input
              type="date"
              id="endDate"
              {...register("endDate", { required: true })}
              className="border-neutral-300 outline-none bg-main-gray"
              disabled={isSubmitting}
              min={getFormattedDate(new Date())}
            />
            {errors["endDate"] && (
              <span className="text-accent-red text-sm">
                {(errors["endDate"] as FieldError).message}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center justify-center sm:ml-2">
        <IoMdSearch size={32} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default QuickSearchBar;
