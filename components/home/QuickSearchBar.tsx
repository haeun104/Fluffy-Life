"use client";

import { FieldError, FieldValues, useForm } from "react-hook-form";
import { getFormattedDate } from "@/util";
import { IoMdSearch } from "react-icons/io";
import useQuickSearchModal from "@/hooks/useQuickSearchModal";
import useSearchSubmit from "@/hooks/useSearchSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../modals/QuickSearchModal";
import { useEffect } from "react";

const QuickSearchBar = () => {
  const quickSearchModal = useQuickSearchModal();
  const { submitSearch } = useSearchSubmit();

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      service: "hotel",
      startDate: "",
      endDate: "",
      date: "",
    },
    resolver: zodResolver(schema),
  });

  const service = watch("service");
  const date = watch("date");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Reset errors whenever input values are changed
  useEffect(() => {
    clearErrors();
  }, [date, startDate, endDate, service, clearErrors]);

  const submitQuickSearch = (data: FieldValues) => {
    submitSearch(data);
  };

  return (
    <>
      <div className="mx-auto hidden sm:flex sm:flex-col">
        <div className="flex gap-2 bg-neutral-300 rounded-3xl p-2 text-[#31363F] shadow-md text-xs sm:text-sm">
          <div className="flex flex-col text-start ml-2">
            <label htmlFor="service" className="text-xs indent-1">
              Service
            </label>
            <select
              id="service"
              {...register("service", { required: true })}
              className="border-neutral-300 outline-none bg-neutral-300"
            >
              <option value="hotel">Hotel</option>
              <option value="grooming">Grooming</option>
            </select>
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
                  className="border-neutral-300 outline-none  bg-neutral-300"
                  disabled={isSubmitting}
                  min={getFormattedDate(new Date())}
                />
              </div>
              <div className="flex flex-col text-start">
                <label htmlFor="endDate" className="text-xs">
                  Check-out
                </label>
                <input
                  type="date"
                  id="endDate"
                  {...register("endDate", { required: true })}
                  className="border-neutral-300 outline-none bg-neutral-300"
                  disabled={isSubmitting}
                  min={getFormattedDate(new Date())}
                />
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col text-start">
              <label htmlFor="date" className="text-xs">
                Date
              </label>
              <input
                type="date"
                id="date"
                {...register("date", { required: true })}
                className="border-neutral-300 outline-none bg-neutral-300"
                disabled={isSubmitting}
                min={getFormattedDate(new Date())}
              />
            </div>
          )}
          <div className="flex items-center justify-center sm:ml-2">
            <IoMdSearch
              size={32}
              className="cursor-pointer"
              onClick={handleSubmit(submitQuickSearch)}
            />
          </div>
        </div>
        <div className="flex flex-col mt-2">
          {errors["startDate"] && (
            <span className="text-accent-red text-sm">
              {(errors["startDate"] as FieldError).message}
            </span>
          )}
          {errors["endDate"] && (
            <span className="text-accent-red text-sm">
              {(errors["endDate"] as FieldError).message}
            </span>
          )}
          {errors["date"] && (
            <span className="text-accent-red text-sm">
              {(errors["date"] as FieldError).message}
            </span>
          )}
        </div>
      </div>
      <div
        className="shadow-md bg-neutral-300 rounded-3xl p-2 text-[#31363F] flex cursor-pointer min-w-[300px] max-w-[350px] mx-auto sm:hidden"
        onClick={() => quickSearchModal.onOpen()}
      >
        <div className="text-sm ml-2 flex flex-col flex-1">
          <span className="font-bold">What you need for your dog</span>
          <span>Service &middot; Check-in &middot; Check-out</span>
        </div>
        <div className="flex items-center justify-center mr-2">
          <IoMdSearch size={32} />
        </div>
      </div>
    </>
  );
};

export default QuickSearchBar;
