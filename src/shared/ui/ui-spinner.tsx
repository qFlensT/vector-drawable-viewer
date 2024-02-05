import Spinner from "./assets/svg/spinner.svg?react";
import { cn } from "../lib/utils/cn";

const UiSpinner = ({ className }: { className?: string }) => {
  return <Spinner className={cn("text-blue-500", className)} />;
};

export default UiSpinner;
