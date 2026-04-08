import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { themeLabels, roomLabels, roomType, themeType } from "../utils/dropdownTypes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropDownProps {
  theme: themeType | roomType;
  setTheme: (theme: themeType | roomType) => void;
  themes: themeType[] | roomType[];
}

export default function DropDown({ theme, setTheme, themes }: DropDownProps) {
  const getLabel = (item: string) => {
    return (themeLabels as any)[item] || (roomLabels as any)[item] || item;
  };

  return (
    <Menu as="div" className="relative block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-xl border border-[rgba(93,74,50,0.24)] bg-[rgba(255,252,246,0.9)] px-4 py-2.5 text-accent shadow-sm hover:bg-[rgba(255,252,246,1)] hover:border-[rgba(93,74,50,0.34)] focus:outline-none focus:ring-2 focus:ring-[rgba(175,135,80,0.28)] transition-all duration-300 font-body">
          {getLabel(theme)}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden text-accent"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block text-accent"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-xl bg-[rgba(255,251,244,0.98)] shadow-lg ring-1 ring-[rgba(93,74,50,0.2)] focus:outline-none overflow-hidden backdrop-blur"
          key={theme}
        >
          <div className="">
            {themes.map((themeItem) => (
              <Menu.Item key={themeItem}>
                {({ active }) => (
                  <button
                    onClick={() => setTheme(themeItem)}
                    className={classNames(
                      active ? "bg-[rgba(93,74,50,0.08)] text-accent" : "text-text-secondary",
                      themeItem === theme ? "bg-[rgba(175,135,80,0.14)] font-medium" : "",
                      "px-4 py-2.5 text-sm w-full text-left flex items-center space-x-2 justify-between transition-colors duration-200"
                    )}
                  >
                    <span>{getLabel(themeItem)}</span>
                    {themeItem === theme ? (
                      <CheckIcon className="w-4 h-4 text-accent font-bold" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
