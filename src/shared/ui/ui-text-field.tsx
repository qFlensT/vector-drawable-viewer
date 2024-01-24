import { InputHTMLAttributes, useId } from "react";
import { cn } from "../lib/utils";

export type UiTextFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

const UiTextField = ({
  className,
  label,
  error,
  inputProps,
}: UiTextFieldProps) => {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {!!label && (
        <label htmlFor={id} className="ml-0.5 text-gray-500">
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        {...inputProps}
        className={cn(
          "rounded bg-gray-700 px-2 py-2 text-sm text-slate-100 opacity-60 ring-blue-500 transition-[opacity,box-shadow] placeholder:text-gray-500 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2",
          !!error && "opacity-100 ring-2 ring-rose-600",
          inputProps?.className,
        )}
      />
      {error && <span className="ml-0.5 text-sm text-rose-600">{error}</span>}
    </div>
  );
};

export default UiTextField;
