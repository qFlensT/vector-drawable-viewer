import { Fragment, ReactNode } from "react";
import { cn } from "../lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import ArrowIcon from "./assets/svg/arrow.svg?react";

export type UiSelectOption = {
  value: string;
  label: string;
  icon?: ReactNode;
};

export type UiSelectProps = {
  className?: string;
  options: UiSelectOption[];
};

const UiSelect = ({ className, options }: UiSelectProps) => {
  return (
    <Listbox>
      <div className="relative">
        <Listbox.Button
          className={cn(
            "ui-open:opacity-100 flex w-full items-center justify-between rounded bg-gray-700 px-2 py-2 text-left text-sm text-slate-100 opacity-60 transition-opacity hover:opacity-100 active:opacity-100",
            className,
          )}
        >
          Workin on{" "}
          <ArrowIcon className=" ui-open:scale-[-1] transition-transform" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          enterFrom="opacity-0 transition-opacity"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 flex w-full flex-col gap-0.5 overflow-hidden rounded rounded bg-gray-700 text-sm text-slate-100">
            {options.map((option) => (
              <Listbox.Option
                className="cursor-pointer bg-gray-700 px-2 py-2 text-slate-100 opacity-60 transition-opacity hover:opacity-100 active:opacity-100"
                value={option.value}
                key={option.value}
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default UiSelect;
