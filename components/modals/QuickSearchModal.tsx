"use client";

import useQuickSearchModal from "@/hooks/useQuickSearchModal";
import Modal from "./Modal";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { getFormattedDate } from "@/util";
import Input from "../inputs/Input";
import useSearchSubmit from "@/hooks/useSearchSubmit";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const schema = z
  .object({
    service: z.string(),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    date: z.string().nullable(),
  })
  .refine(
    (data) => {
      if (data.service === "hotel") {
        return data.startDate !== "" && data.endDate !== "";
      }

      return true;
    },
    {
      message: "Both of check in and out dates need to be input",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      if (
        data.service === "hotel" &&
        data.startDate !== null &&
        data.endDate !== null
      ) {
        const start = new Date(data.startDate).getTime();
        const end = new Date(data.endDate).getTime();
        const isBothEmpty = isNaN(start) && isNaN(end);
        return (start < end && start !== end) || isBothEmpty;
      }

      return true;
    },
    {
      message: "Check-out date must be later than check-in date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.service === "grooming") {
        return data.date !== "";
      }
      return true;
    },
    { message: "Date must be chosen", path: ["date"] }
  );

const QuickSearchModal = () => {
  const quickSearchModal = useQuickSearchModal();
  const { submitSearch } = useSearchSubmit();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      service: "hotel",
      startDate: "",
      endDate: "",
      date: "",
    },
    resolver: zodResolver(schema),
  });

  const service = watch("service");

  const submitQuickSearch = (data: FieldValues) => {
    let searchData;
    if (data.service === "hotel") {
      searchData = { ...data, date: "" };
    }
    if (data.service === "grooming") {
      searchData = { ...data, startDate: "", endDate: "" };
    }
    submitSearch(searchData as FieldValues);
    quickSearchModal.onClose();
  };

  const bodyContent = (
    <div>
      <h2 className="font-bold mb-4">Quick Availability Check</h2>
      <div className="w-full flex flex-col mt-2 mb-4">
        <label htmlFor="service" className="text-sm">
          Service
        </label>
        <select
          id="service"
          {...register("service", { required: true })}
          className={`border-solid ${
            errors["service"] ? "border-accent-red " : "border-neutral-300"
          } border-[1px] rounded-md outline-none p-2 disabled:border-none disabled:bg-white disabled:px-0 disabled:text-gray-500 h-[44px]`}
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
          <Input
            id="startDate"
            label="Check-in"
            type="date"
            register={register}
            errors={errors}
            disabled={isSubmitting}
            min={getFormattedDate(new Date())}
          />
          <Input
            id="endDate"
            label="Check-out"
            type="date"
            register={register}
            errors={errors}
            disabled={isSubmitting}
            min={getFormattedDate(new Date())}
          />
        </>
      ) : (
        <Input
          id="date"
          label="Date"
          type="date"
          register={register}
          errors={errors}
          disabled={isSubmitting}
          min={getFormattedDate(new Date())}
        />
      )}
    </div>
  );

  return (
    <Modal
      isOpen={quickSearchModal.isOpen}
      onClose={quickSearchModal.onClose}
      bodyContent={bodyContent}
      actionLabel="Search"
      style="bg-accent-light-green"
      onSubmit={handleSubmit(submitQuickSearch)}
    />
  );
};

export default QuickSearchModal;
