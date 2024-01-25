import { Fragment, ReactNode } from "react";
import { cn } from "../lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import ArrowIcon from "./assets/svg/arrow.svg?react";
import CheckIcon from "./assets/svg/check.svg?react";
import CrossIcon from "./assets/svg/cross.svg?react";

export type UiSelectOption = {
  id: string;
  label: string;
  disabled?: boolean;
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
    <Listbox as={Fragment} value={value} by="id" onChange={onChange}>
      <div className="relative text-slate-100">
        <Listbox.Button
          className={cn(
            "grid w-full select-none grid-cols-[min-content,min-content,1fr] items-center justify-items-end gap-2 rounded bg-gray-700 px-2.5 py-2 text-sm opacity-60 transition-opacity hover:opacity-100 active:opacity-100 ui-open:opacity-100",
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
              "absolute mt-1 flex w-full flex-col overflow-hidden rounded bg-gray-800 text-sm",
              optionsClassName,
            )}
          >
            {options.map((option) => (
              <Listbox.Option
                value={option}
                key={option.id}
                disabled={option.disabled}
                className={cn(
                  "grid cursor-not-allowed select-none grid-cols-[min-content,min-content,1fr] items-center justify-items-end gap-2 bg-gray-700 px-2.5 py-2 opacity-40 transition-opacity ui-selected:opacity-100 ui-not-disabled:cursor-pointer ui-not-disabled:opacity-60 ui-not-disabled:hover:opacity-100 ui-not-disabled:active:opacity-100",
                  optionClassName,
                )}
              >
                {option.Icon}
                {option.label}
                <CheckIcon className="col-start-3 hidden ui-open:ui-selected:block" />
                <CrossIcon className="col-start-3 hidden ui-open:ui-disabled:block" />
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
