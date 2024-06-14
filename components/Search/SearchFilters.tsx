"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  formUrlQuery,
  formatFilterKey,
  formatFilterTitle,
  removeKeysFromQuery,
  sortKeys,
} from "@/lib/utils";
import { SearchFilterProps, SearchFilterData } from "@/types";

const SearchFilters = ({ data: filterData }: SearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checkState, setCheckState] = useState<string[]>([]);

  useEffect(() => {
    const queryParams = Array.from(searchParams.values())
      .map((value) => value.split(","))
      .flat();
    setCheckState(queryParams);
  }, [searchParams]);

  const handleCheckFilter = (key: string, value: string) => {
    const newKey = formatFilterKey(key);
    const existingFilter = searchParams.get(newKey);
    const filterValues = existingFilter ? existingFilter.split(",") : [];
    const valueIndex = filterValues.indexOf(value);

    if (valueIndex > -1) {
      // Remove the value if it exists
      filterValues.splice(valueIndex, 1);
    } else {
      // Add the value if it doesn't exist
      filterValues.push(value);
    }

    // Update or remove the key based on the remaining values
    const newUrl =
      filterValues.length > 0
        ? formUrlQuery({
            params: searchParams.toString(),
            items: new Map([[newKey, filterValues.join(",")]]),
          })
        : removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: [newKey],
          });

    router.push(newUrl, { scroll: false });
  };

  const sortedKeys = sortKeys(filterData);

  return (
    <div className="flex w-full flex-col items-start justify-start gap-[30px]">
      <Accordion
        type="multiple"
        defaultValue={["employment_types", "job_requirements", "date_posted"]}
        className="flex w-full flex-col items-start justify-start gap-5"
      >
        {sortedKeys.map((key) => {
          const itemsArray = filterData[key as keyof SearchFilterData];
          if (itemsArray && itemsArray.length > 0) {
            return (
              <AccordionItem
                className="w-full border-b-0"
                key={key}
                value={key}
              >
                <AccordionTrigger className="flex w-full justify-between gap-12 pt-0 text-lg font-semibold leading-normal text-gray-900 hover:no-underline dark:text-white">
                  {formatFilterTitle(key)}
                </AccordionTrigger>
                <AccordionContent className="flex w-full flex-col items-start justify-start gap-3">
                  {itemsArray.map((item, index) => {
                    if ("name" in item) {
                      return (
                        <div
                          key={index}
                          className="flex w-full items-center justify-between"
                        >
                          <div className="flex items-center justify-start gap-3.5">
                            <Checkbox
                              checked={checkState.includes(item.value)}
                              id={item.value}
                              value={item.value}
                              className="border-natural-6 text-natural-6 data-[state=checked]:border-none dark:border-natural-8 dark:text-natural-8"
                              onCheckedChange={() =>
                                handleCheckFilter(key, item.value)
                              }
                            />
                            <label
                              htmlFor={item.value}
                              className="text-sm font-medium leading-tight text-natural-8 dark:text-natural-5"
                            >
                              {item.name}
                            </label>
                          </div>
                          <Badge className="ml-auto flex items-center justify-center gap-[9px] rounded-[5px] bg-natural-2 px-1.5 py-0.5 text-sm font-medium leading-tight text-natural-8 dark:bg-darkBg-3 dark:text-natural-2">
                            {item.est_count}
                          </Badge>
                        </div>
                      );
                    }
                    return null;
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          }
          return null;
        })}
      </Accordion>
    </div>
  );
};

export default SearchFilters;
