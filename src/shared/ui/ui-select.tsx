import { ReactNode } from "react";
import { cn } from "../lib/utils";

export type UiSelectOption = {
  value: string;
  label: string;
  icon?: ReactNode;
};

export type UiSelectProps = {
  className?: string;
  options?: UiSelectOption[];
};

const UiSelect = ({ className, options }: UiSelectProps) => {
  return (
    <form
      className={cn("", className)}
      onSubmit={(e) => e.preventDefault()}
    ></form>
  );
};

export default UiSelect;
