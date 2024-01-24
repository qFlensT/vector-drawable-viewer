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
        "flex h-min w-min items-center gap-1 rounded px-4 py-1 text-white transition-[opacity,transform] hover:opacity-90 active:scale-105 active:opacity-90",
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
