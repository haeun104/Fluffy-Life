import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full flex flex-col mb-4">
      <label htmlFor={id}>{label}</label>
      <input
        type={type ? type : "text"}
        id={id}
        {...register(id, { required })}
        placeholder="  "
        className="border-solid border-neutral-300 border-[1px] rounded-md outline-none p-2"
      />
    </div>
  );
};

export default Input;
