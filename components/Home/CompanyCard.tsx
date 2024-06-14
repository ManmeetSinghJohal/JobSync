import React from "react";
import Image from "next/image";
import Link from "next/link";

import CompanyCardCompanyLogo from "./CompanyCardCompanyLogo";
import { CompanyCardProps } from "@/types";
import { Button } from "../ui/button";
import { location } from "@/lib/utils";

const CompanyCard = ({
  name,
  logo,
  city,
  state,
  country,
  vacancies,
  id,
}: CompanyCardProps) => {
  const formattedCompanyName = name;
  const formattedLocation = location(city, state, country);

  return (
    <Link href={`/company-details/${id}`}>
      <div className="flex h-full flex-col justify-between rounded-[10px] bg-white p-5 shadow dark:bg-darkBg-2  xl:mb-[60px] xl:h-[216px]">
        <div className="flex shrink-0 flex-col ">
          <div className="flex items-center gap-2.5 lg:min-h-[45px]">
            {/* Company Logo */}
            <CompanyCardCompanyLogo
              className="rounded-full object-contain"
              width={48}
              height={48}
              alt={name}
              src={logo}
              fallbackSrc="/assets/icons/default-logo-alt.svg"
            />
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="w-[144px] truncate text-lg font-semibold capitalize leading-normal text-black dark:text-white ">
                {formattedCompanyName}
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-row items-start justify-start gap-2  md:flex-col">
            <div className="flex items-center justify-start gap-2.5">
              <div className="relative h-5 w-5">
                <Image
                  src="/assets/icons/pin.svg"
                  alt="location icon"
                  width={20}
                  height={20}
                />
              </div>
              <div className="items-center text-sm font-semibold leading-normal text-neutral-400">
                {formattedLocation}
              </div>
            </div>
            <div className="flex items-center justify-start gap-2.5">
              <div className="relative h-5 w-5">
                <Image
                  src="/assets/icons/briefcase.svg"
                  alt="job logo"
                  width={20}
                  height={20}
                />
              </div>
              <div className="flex text-sm font-semibold leading-normal text-neutral-400">
                {vacancies > 1
                  ? `${vacancies} Job Vacancies`
                  : `${vacancies} Job Vacancy`}
              </div>
            </div>
          </div>
        </div>

        <Button className="mt-2 flex h-[44px] w-full gap-2.5 self-center rounded-[10px] bg-natural-4 px-3.5 py-3 text-sm font-bold leading-normal text-natural-6 dark:bg-darkBg-3">
          See All
        </Button>
      </div>
    </Link>
  );
};

export default CompanyCard;
