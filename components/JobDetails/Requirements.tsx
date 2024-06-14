import React from "react";

import { formatEmploymentType } from "@/lib/utils";
import { RequProps } from "@/types";

const Requirements = ({
  jobExperience,
  jobTitle,
  minSalary,
  employmentType,
}: RequProps) => {
  const salaryPerMonth = minSalary ? minSalary / 12 : null;

  return (
    <div className="mt-7 rounded-2xl bg-natural-3 p-4 font-manrop dark:bg-darkBg-3 lg:mt-9 lg:flex">
      <div className="mb-2.5 grid grid-cols-2 lg:mb-0 lg:flex lg:w-1/2 lg:justify-around">
        <div>
          <div className="mb-[6px] text-[13px] font-medium text-natural-6">
            Experience
          </div>
          <div className="text-sm font-normal tracking-wide text-natural-8 dark:text-white">
            Minimum {jobExperience} Year
          </div>
        </div>

        <div>
          <div className=" mb-[6px] text-[13px] font-medium text-natural-6">
            Work Level
          </div>
          <div className="text-sm font-normal  tracking-wide text-natural-8 dark:text-white">
            {jobTitle === null ? "All level's" : jobTitle}
          </div>
        </div>
      </div>

      <div className="my-1 h-[1px] w-full bg-natural-5 dark:bg-dark lg:hidden" />

      <div className="mt-2.5 grid grid-cols-2 lg:mt-0 lg:flex lg:w-1/2 lg:justify-around">
        <div>
          <div className="mb-[6px]  text-[13px] font-medium text-natural-6">
            Employee Type
          </div>
          <div className="text-sm font-normal tracking-wide text-natural-8 dark:text-white">
            {formatEmploymentType(employmentType)} Job
          </div>
        </div>

        <div>
          <div className="mb-[6px] text-[13px] font-medium text-natural-6">
            Offer Salary
          </div>
          <div className="text-sm font-normal tracking-wide text-natural-8 dark:text-white">
            {minSalary === null
              ? "Not Specified"
              : `${salaryPerMonth?.toFixed(1) ?? "Unknown"} /Month`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirements;
