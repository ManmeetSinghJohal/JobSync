import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectDropDownProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  items: {
    id: number;
    value: string;
    name: string;
  }[];
  extraClasses?: string;
}

const SelectDropDown = ({
  value,
  setValue,
  placeholder,
  items,
  extraClasses,
}: SelectDropDownProps) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        className={`w-full rounded-none border-none px-0 text-sm font-bold leading-normal focus:outline-none focus:ring-0 focus:ring-offset-0 ${extraClasses}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white text-sm font-semibold leading-normal text-neutral-400 outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 dark:border-none dark:bg-darkBg-3 dark:text-natural-6">
        <SelectGroup>
          {items.length > 0 &&
            items.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDropDown;
