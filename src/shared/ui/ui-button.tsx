import { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type UiButtonVariant = "primary" | "success" | "warning" | "danger" | "neutral";

export type UiButtonProps = {
  variant: UiButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const UiButton = ({ className, variant, ...props }: UiButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "flex h-min w-min select-none items-center gap-1 rounded px-4 py-1 text-slate-100 transition-[opacity,transform] hover:opacity-90 active:scale-95 active:opacity-90",
        {
          primary: "bg-blue-500",
          success: "bg-green-500",
          warning: "bg-orange-500",
          danger: "bg-rose-600",
          neutral: "bg-gray-700 ",
        }[variant],
        className,
      )}
    ></button>
  );
};

export default UiButton;
