import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  widthContainer?: string;
  hidden?: boolean;
  disabled?: boolean;
  textArea?: boolean;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  widthContainer,
  hidden,
  disabled,
  textArea,
}: InputFieldProps) => {
  return (
    <div
      className={`flex flex-col gap-2 w-full ${
        widthContainer ? widthContainer : "md:w-1/4"
      } ${hidden && "hidden"}`}
    >
      <label className="text-xs text-gray-500">{label}</label>
      {textArea ? (
        <textarea
          {...register(name)}
          className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${
            disabled && "bg-gray-100 cursor-not-allowed"
          }`}
          {...inputProps}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          {...register(name)}
          className={`ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ${
            disabled && "bg-gray-100 cursor-not-allowed"
          }`}
          {...inputProps}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      )}
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
