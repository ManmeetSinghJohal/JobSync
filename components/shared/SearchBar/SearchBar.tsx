"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectDropDown from "@/components/shared/SearchBar/SelectDropdown";
import InputLocation from "@/components/shared/SearchBar/InputLocation";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { jobTypes } from "@/constants";
import { formUrlQuery } from "@/lib/utils";

interface SearchBarProps {
  route: string;
}

const SearchBar = ({ route }: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { placePredictions, getPlacePredictions } = useGoogle({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const queryParam = searchParams.get("query");
  const [query, setQuery] = useState(queryParam || "");

  const employmentTypesParams = searchParams.get("employmentTypes");
  const [employmentTypes, setEmploymentTypes] = useState(
    employmentTypesParams || ""
  );

  const locationParam = searchParams.get("location");
  const [location, setLocation] = useState(locationParam || "");

  const [isActive, setIsActive] = useState(false);

  const handleFindJobsClick = () => {
    const modifiable = new Map(searchParams.entries());

    if (query) {
      modifiable.set("query", query);
    } else {
      modifiable.delete("query");
    }

    if (location) {
      modifiable.set("location", location);
    } else {
      modifiable.delete("location");
    }

    if (employmentTypes) {
      modifiable.set("employmentTypes", employmentTypes);
    } else {
      modifiable.delete("employmentTypes");
    }

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      items: modifiable,
    });

    router.push(newUrl, { scroll: false });
  };

  const handleClick = (description: string) => {
    setLocation(description);
    setIsActive(false);
  };

  return (
    <section className="flex w-full flex-col flex-nowrap rounded-[20px] bg-white shadow dark:bg-darkBg-3 lg:h-20 lg:flex-row">
      {/* Job Title Input */}
      <div className="inline-flex w-full flex-col items-start justify-start gap-2.5 rounded-t-[20px] border-b border-natural-2 px-5 py-[20px] dark:border-natural-8 lg:w-1/3 lg:rounded-l-[20px] lg:rounded-t-none lg:border-b-0 lg:border-r">
        <div className="inline-flex w-full items-center justify-start gap-[13px] ">
          <Image
            src="/assets/icons/search.svg"
            alt="search icon"
            width={28}
            height={28}
            className="cursor-pointer dark:text-natural-6"
          />

          <Input
            type="text"
            placeholder="Job Title, Company, or Keywords"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-none border-none px-0 text-sm font-bold leading-normal text-neutral-400 shadow-none outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-darkBg-3 dark:text-natural-6"
          />
        </div>
      </div>

      {/* Location Input */}
      <div className="inline-flex w-full flex-col items-start justify-start gap-2.5 border-b border-natural-2 bg-white px-5 py-[20px] dark:border-natural-8 dark:bg-darkBg-3 lg:w-1/4 lg:border-b-0 lg:border-r">
        <div className="inline-flex w-full flex-col items-center justify-start">
          <div className="flex w-full items-center justify-start gap-[13px]">
            <Image
              src="/assets/icons/pin.svg"
              alt="location icon"
              width={28}
              height={28}
              className="cursor-pointer dark:text-natural-6"
            />

            {/* Google Map Autocomplete Input */}
            <InputLocation
              placeholder="Job Location"
              value={location}
              setValue={setLocation}
              getPlacePredictions={getPlacePredictions}
              extraClasses="focus-visible:ring-offset-0 focus-visible:ring-0"
              setIsActive={setIsActive}
            />
          </div>

          {isActive && (
            <div className="z-10 flex w-full flex-1 flex-col rounded-md border-t-0 bg-white px-9 text-sm font-bold leading-normal text-neutral-400 shadow dark:bg-darkBg-3 dark:text-natural-6 lg:mt-[8px]">
              <ul>
                {placePredictions.map((prediction) => (
                  <li
                    className="mb-4 cursor-pointer"
                    key={prediction.id}
                    onClick={() => handleClick(prediction.description)}
                  >
                    {prediction.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Job Type Select Dropdown */}
      <div className="flex w-full min-w-[327px] flex-col gap-2.5 border-b border-natural-2 px-5 py-[20px] dark:border-natural-8 lg:w-1/4 lg:border-b-0 lg:border-r">
        <div className="inline-flex w-full items-center justify-between">
          <div className="flex w-full items-center justify-start gap-[13px]">
            <Image
              src="/assets/icons/briefcase.svg"
              alt="job type icon"
              width={28}
              height={28}
              className="cursor-pointer dark:text-natural-6"
            />

            <SelectDropDown
              value={employmentTypes}
              setValue={setEmploymentTypes}
              placeholder="Job Type (optional)"
              items={jobTypes}
              extraClasses="text-neutral-400 dark:text-natural-6"
            />
          </div>
        </div>
      </div>

      {/* Find Jobs Button */}
      <div className="flex w-full items-center justify-end gap-2.5 rounded-b-[20px] px-[10px] py-[16px] lg:ml-auto lg:w-1/5 lg:rounded-b-none lg:rounded-r-[20px] xl:px-[29px]">
        <Button
          onClick={handleFindJobsClick}
          className="h-[48px] w-full rounded-[10px] bg-primary text-center text-sm font-semibold leading-normal tracking-wide text-white duration-200 hover:opacity-90 dark:bg-primary dark:hover:shadow-lg lg:w-[105px]"
        >
          Find Jobs
        </Button>
      </div>
    </section>
  );
};

export default SearchBar;
