import React from "react";

import {
  calculateHourlyRate,
  formatEmploymentType,
  formatJobTitle,
  formatQualityScore,
  location,
} from "@/lib/utils";
import InlineJobCardCompanyLogo from "./InlineJobCardCompanyLogo";
import { InlineJobCardProps } from "@/types";

const InlineJobCard = ({
  employerName,
  employerLogo,
  jobTitle,
  jobEmploymentType,
  jobCity,
  jobState,
  jobMinSalary,
  jobMaxSalary,
  jobCountry,
  jobQualityScore,
}: InlineJobCardProps) => {
  const hourlyRate = calculateHourlyRate(jobMinSalary, jobMaxSalary);
  const employmentType = formatEmploymentType(jobEmploymentType);
  const formattedJobTitle = formatJobTitle(jobTitle);

  const formattedLocation = location(jobCity, jobState, jobCountry);
  const formattedQualityScore = formatQualityScore(jobQualityScore);

  return (
    <div className="relative inline-flex h-[78px] w-full flex-col items-start justify-center gap-2.5 rounded-[10px] bg-neutral-50 px-3 py-3.5 dark:bg-darkBg-3">
      <div className="inline-flex items-center justify-start gap-[9px]">
        {/* Company Logo */}
        <InlineJobCardCompanyLogo
          className="rounded-full"
          width={36}
          height={36}
          alt={employerName}
          src={employerLogo}
          fallbackSrc="/assets/icons/default-logo-alt.svg"
        />

        {/* Title, Location section */}
        <section className="flex items-center justify-end gap-[9px]">
          <div className="inline-flex flex-col items-start justify-start gap-1">
            <div className="w-[200px] truncate text-base font-semibold leading-normal text-black dark:text-white">
              {formattedJobTitle}
            </div>
            <div className="inline-flex items-center justify-start gap-[5px] text-sm font-normal text-zinc-500">
              <div className="w-24 truncate leading-snug">{employerName}</div>
              <div className="w-24 truncate leading-snug">
                {formattedLocation}
              </div>
            </div>
          </div>
        </section>

        {/* Salary, Type section */}
        <section className="absolute right-3 ml-5 inline-flex flex-col items-end justify-start gap-1 text-sm font-normal text-zinc-500">
          <div className="inline-flex items-center justify-start gap-0.5 ">
            {hourlyRate.min && hourlyRate.max ? (
              <>
                <div className="text-sm font-medium leading-tight text-gray-900">{`$${hourlyRate.min}-${hourlyRate.max}`}</div>
                <div className="leading-snug">/ Hr</div>
              </>
            ) : (
              <div className="leading-snug">
                Job Scoring {formattedQualityScore}
              </div>
            )}
          </div>
          <div className="truncate leading-snug">{employmentType}</div>
        </section>
      </div>
    </div>
  );
};

export default InlineJobCard;
