import { UseFormRegisterReturn } from "react-hook-form";
import { BsEyeSlash, BsFillEyeFill } from "react-icons/bs";
import { useAuth } from "../hooks/userAuth";

interface iInputProps {
  label: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  hideIcon?: boolean;
  defaultValue?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const Input = ({
  label,
  type,
  placeholder,
  disabled,
  value,
  register,
  error,
  defaultValue,
  hideIcon = false,
  onBlur,
}: iInputProps) => {
  const { showPass, setShowPass } = useAuth();
  return (
    <div className="flex flex-col gap-2 input-width w-full relative">
      <label
        className="font-inter font-medium text-sm text-grey-1"
        htmlFor={label}>
        {label}
      </label>

      <input
        id={label}
        {...register}
        type={type === "password" && !showPass ? "password" : "text"}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onBlur={onBlur}
        defaultValue={defaultValue}
        className="w-full h-12 px-4 border-grey-8 border-1.5 rounded bg-white-fixed mb-6 placeholder:text-grey-3 placeholder:text-base placeholder:font-normal hover:bg-grey-8 focus:outline-none focus:border-brand-2"
      />

      {type === "password" && !hideIcon && (
        <div className="w-fit absolute right-3 top-[2.625rem]">
          {showPass ? (
            <BsEyeSlash
              className="text-brand-3"
              size={20}
              onClick={() => setShowPass(!showPass)}
            />
          ) : (
            <BsFillEyeFill
              className="text-brand-3"
              size={20}
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </div>
      )}
      {error && (
        <p
          className="flex self-end text-alert-1 text-input-error relative bottom-[20px] "
          aria-label="erro na validação do campo">
          {error}
        </p>
      )}
    </div>
  );
};
