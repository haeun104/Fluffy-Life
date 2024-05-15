import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
  disabled?: boolean;
  min?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  register,
  required,
  errors,
  disabled,
  min,
}) => {
  return (
    <div className="w-full flex flex-col mb-4">
      <label htmlFor={id} className="mb-2 text-sm">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        id={id}
        {...register(id, { required })}
        placeholder="  "
        className={`border-solid ${
          errors[id] ? "border-accent-red " : "border-neutral-300"
        } border-[1px] rounded-md outline-none p-2 disabled:border-none disabled:bg-white disabled:px-0 disabled:text-gray-500`}
        disabled={disabled}
        min={min}
      />
      {errors[id] && (
        <span className="text-accent-red text-sm">
          {(errors[id] as FieldError).message}
        </span>
      )}
    </div>
  );
};

export default Input;
