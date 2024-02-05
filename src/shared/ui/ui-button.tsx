import { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils/cn";

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
          primary: "bg-blue-600",
          success: "bg-emerald-600",
          warning: "bg-amber-600",
          danger: "bg-rose-700",
          neutral: "bg-gray-700 ",
        }[variant],
        className,
      )}
    ></button>
  );
};

export default UiButton;
