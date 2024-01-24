import UiSpinner from "./ui-spinner";
import { cn } from "../lib/utils";

const UiPageSpinner = ({
  className,
  spinnerClassName,
}: {
  className?: string;
  spinnerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-gray-800",
        className,
      )}
    >
      <UiSpinner className={cn("h-16 w-16", spinnerClassName)} />
    </div>
  );
};

export default UiPageSpinner;
