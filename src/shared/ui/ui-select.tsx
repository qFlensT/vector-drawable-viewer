import { Fragment, ReactNode } from "react";
import { cn } from "../lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import ArrowIcon from "./assets/svg/arrow.svg?react";
import CheckIcon from "./assets/svg/check.svg?react";

export type UiSelectOption = {
  id: string;
  label: string;
  Icon?: ReactNode;
};

export type UiSelectProps = {
  buttonClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  options: UiSelectOption[];
  value: UiSelectOption;
  onChange: (value: UiSelectOption) => void;
};

const UiSelect = ({
  buttonClassName,
  optionsClassName,
  optionClassName,
  options,
  value,
  onChange,
}: UiSelectProps) => {
  return (
    <Listbox value={value} by="id" onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className={cn(
            "grid w-full grid-cols-[min-content,min-content,1fr] items-center justify-items-end gap-2 rounded bg-gray-700 px-2.5 py-2 text-sm text-slate-100 opacity-60 transition-opacity hover:opacity-100 active:opacity-100 ui-open:opacity-100",
            buttonClassName,
          )}
        >
          {value.Icon}
          {value.label}
          <ArrowIcon className="col-start-3 transition-transform ui-open:scale-[-1]" />
        </Listbox.Button>
        <Transition as={Fragment} {...transitionProps}>
          <Listbox.Options
            className={cn(
              "absolute mt-1 flex w-full flex-col overflow-hidden rounded bg-gray-800 text-sm text-slate-100",
              optionsClassName,
            )}
          >
            {options.map((option) => (
              <Listbox.Option
                className={cn(
                  "grid cursor-pointer select-none grid-cols-[min-content,min-content,1fr] items-center justify-items-end gap-2 bg-gray-700 px-2.5 py-2 text-slate-100 opacity-60 transition-opacity hover:opacity-100 active:opacity-100 ui-selected:opacity-100",
                  optionClassName,
                )}
                value={option}
                key={option.id}
              >
                {option.Icon}
                {option.label}
                <CheckIcon className="col-start-3 opacity-0 ui-open:ui-selected:opacity-100" />
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

const transitionProps = {
  enter: "transition-opacity",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "transition-opacity",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

export default UiSelect;
