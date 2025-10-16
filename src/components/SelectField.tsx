import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  register: any;
  defaultValue?: string;
  error?: FieldError;
  widthContainer?: string;
  hidden?: boolean;
  options?: any;
};

const SelectField = ({
  label,
  register,
  defaultValue,
  error,
  widthContainer,
  hidden,
  options,
}: InputFieldProps) => {
  return (
    <div
      className={`flex flex-col gap-2 w-full ${
        widthContainer ? widthContainer : "md:w-1/4"
      } ${hidden && "hidden"}`}
    >
      <label className="text-xs text-gray-500">{label}</label>
      <select
        {...register("day")}
        defaultValue={defaultValue}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
      >
        {options.map((option: { value: string; label: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default SelectField;
