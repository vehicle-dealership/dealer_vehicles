import { UseFormRegisterReturn } from "react-hook-form";
interface iTextAreaProps {
  label: string;
  register?: UseFormRegisterReturn;
  cols: number;
  rows: number;
  placeholder: string;
  error?: string;
  defaultValue?: string;
}

export const TextArea = ({
  label,
  cols,
  rows,
  register,
  placeholder,
  error,
  defaultValue,
}: iTextAreaProps) => {
  return (
    <div className="flex flex-col gap-2 input-width">
      <label
        className="font-inter font-medium text-sm text-grey-1"
        htmlFor={label}>
        {label}
      </label>
      <textarea
        id={label}
        name={label}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register}
        className="w-full py-6 px-4 border-grey-8 border-1.5 rounded bg-white-fixed mb-6 placeholder:text-grey-3 placeholder:text-base placeholder:font-normal hover:bg-grey-8 focus:outline-none focus:border-brand-2"
        focus:outline-none={true.toString()}
        focus:border-brand-2={true.toString()}
      />
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
