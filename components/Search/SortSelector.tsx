"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, formatSortKey } from "@/lib/utils";
import { sortTypes } from "@/constants/filters";

interface SortSelectorProps {
  extraClasses?: string;
}

const SortSelector = ({ extraClasses }: SortSelectorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam && sortParam !== sortType) {
      setSortType(sortParam);
    }
  }, [sortType, searchParams]);

  const handleSelectSortType = (type: string) => {
    const items = new Map<string, string>();
    items.set("sort", type);

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      items,
    });
    router.push(newUrl);
  };

  return (
    <Select onValueChange={handleSelectSortType}>
      <SelectTrigger
        className={`w-full rounded-none border-none px-0 text-sm font-bold leading-normal focus:outline-none focus:ring-0 focus:ring-offset-0 ${extraClasses}`}
      >
        <SelectValue placeholder={formatSortKey(sortType)} />
      </SelectTrigger>
      <SelectContent className="bg-white text-sm font-semibold leading-normal text-neutral-400 outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 dark:border-none dark:bg-darkBg-3 dark:text-natural-6">
        <SelectGroup>
          {sortTypes.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortSelector;
