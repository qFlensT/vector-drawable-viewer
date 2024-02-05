import { Tab } from "@headlessui/react";
import { cn } from "../../lib/utils/cn";

export type TabRoutes = {
  tabName: string;
  element: React.ReactNode;
};

export type TabViewLayoutProps = {
  tabs: TabRoutes[];
  tabListClassName?: string;
  tabPanelsClassName?: string;
};

export const TabViewLayout = ({
  tabs,
  tabListClassName,
  tabPanelsClassName,
}: TabViewLayoutProps) => {
  return (
    <Tab.Group>
      <div className="flex h-full flex-col">
        <Tab.List
          className={cn("flex w-full overflow-x-auto", tabListClassName)}
        >
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              className="w-28 flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap bg-gray-800 px-2 py-2 text-slate-100 opacity-60 outline-none transition-[background-color,opacity] duration-75 hover:bg-gray-700 active:bg-gray-700 active:opacity-100 ui-selected:bg-gray-700 ui-selected:opacity-100"
            >
              {tab.tabName}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className={cn("flex-grow", tabPanelsClassName)}>
          {tabs.map((tab, i) => (
            <Tab.Panel key={i}>{tab.element}</Tab.Panel>
          ))}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};
