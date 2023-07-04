import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface iSelectProps {
  label: string;
  disabled?: boolean;
  children: ReactNode;
  handleSelect?: (name: string) => void | Promise<void>;
  register?: UseFormRegisterReturn;
  error?: string;
  defaultValues?: string;
}

export const Select = ({
  label,
  disabled = false,
  children,
  handleSelect,
  register,
  error,
  defaultValues,
}: iSelectProps) => {
  return (
    <div className="flex flex-col gap-2 input-width">
      <label
        className="font-inter font-medium text-sm text-grey-1"
        htmlFor={label}>
        {label}
      </label>

      <select
        id={label}
        {...register}
        className="w-full h-12 text-grey-3 px-4 border-grey-8 border-1.5 rounded bg-white-fixed hover:bg-grey-8 mb-6"
        onChange={(event) => handleSelect && handleSelect(event.target.value)}
        disabled={disabled}>
        {!disabled && (
          <option value="" hidden={true}>
            {defaultValues}
          </option>
        )}
        {children}
      </select>
      {error && (
        <p
          className="flex self-end text-alert-1 text-input-error absolute bottom-[-20px] "
          aria-label="erro na validação do campo">
          {error}
        </p>
      )}
    </div>
  );
};
