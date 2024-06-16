import { formatISO } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, useForm } from "react-hook-form";

const useSearchSubmit = () => {
  const router = useRouter();
  const params = useParams();

  const { reset } = useForm();

  const submitSearch = (data: FieldValues) => {
    let query = {};
    if (params) {
      query = queryString.parse(params.toString());
    }

    let updatedQuery: any = { ...query };

    if (data.service === "hotel") {
      updatedQuery.startDate = formatISO(data.startDate);
      updatedQuery.endDate = formatISO(data.endDate);
      updatedQuery.roomType = data.roomType ? data.roomType : "All";
    }
    if (data.service === "grooming") {
      updatedQuery.date = formatISO(data.date);
    }

    const url = queryString.stringifyUrl(
      {
        url: data.service === "hotel" ? "/hotel" : "/grooming",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
    reset();
  };
  return { submitSearch };
};

export default useSearchSubmit;
