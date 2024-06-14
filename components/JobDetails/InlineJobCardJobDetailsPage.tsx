import React from "react";
import Link from "next/link";

import defaultLogo from "@/public/assets/icons/default-logo.svg";

import {
  calculateHourlyRate,
  formatJobTitle,
  getDurationLeft,
  location,
  formatEmploymentType,
  formatQualityScore,
} from "@/lib/utils";
import InlineJobCardCompanyLogo from "../Home/InlineJobCardCompanyLogo";

import { Job } from "@/types";

const InlineJobCardJobDetailsPage = ({ job }: { job: Job }) => {
  const {
    employer_name: employerName,
    employer_logo: employerLogo,
    job_title: jobTitle,
    job_city: jobCity,
    job_state: jobState,
    job_min_salary: jobMinSalary,
    job_max_salary: jobMaxSalary,
    job_id: jobId,
    job_offer_expiration_datetime_utc: jobExpiresAt,
    job_country: jobCountry,
    job_employment_type: jobEmploymentType,
    job_apply_quality_score: jobQualityScore,
  } = job || {};
  const hourlyRate = calculateHourlyRate(jobMinSalary, jobMaxSalary);
  const formattedJobTitle = formatJobTitle(jobTitle);
  const employmentType = formatEmploymentType(jobEmploymentType);
  const formattedQualityScore = formatQualityScore(jobQualityScore);

  return (
    <Link
      className="grid h-full w-full grid-rows-2 gap-y-5 p-5 font-manrop"
      href={`/jobs/${jobId}?title=${jobTitle}`}
    >
      <section className="flex justify-between">
        <div className="flex items-center gap-3.5">
          <InlineJobCardCompanyLogo
            className="h-12 min-w-[48px] rounded-full object-contain"
            width={48}
            height={48}
            alt={employerName}
            src={employerLogo}
            fallbackSrc={defaultLogo}
          />

          <div>
            <div className="mb-1.5 w-[150px] truncate text-base font-bold leading-normal text-black dark:text-white md:w-[400px] md:text-lg xl:w-[200px] xl:text-base">
              {formattedJobTitle}
            </div>
            <div className="w-24 truncate text-sm font-normal text-natural-6">
              {location(jobCity, jobState, jobCountry)}
            </div>
          </div>
        </div>

        <div className="whitespace-nowrap text-sm">
          {hourlyRate.min && hourlyRate.max ? (
            <div className="flex items-center">
              <div className="mr-1 font-semibold leading-tight text-black dark:text-white">{`$${hourlyRate.min}-${hourlyRate.max}`}</div>
              <div className=" text-natural-6">/ Hr</div>
            </div>
          ) : (
            <div className="truncate leading-snug text-natural-6">
              {employmentType}
            </div>
          )}
        </div>
      </section>

      <section className="flex justify-between">
        {jobExpiresAt ? (
          <div className="flex items-center text-sm font-medium text-natural-6">
            <p>{getDurationLeft(jobExpiresAt)}</p>
          </div>
        ) : (
          <div className="flex items-center text-sm leading-snug text-natural-6">
            Job Scoring {formattedQualityScore}
          </div>
        )}
        <div className="flex items-center gap-2.5">
          <button className="w-[60px] rounded-md border-0 bg-secondary-5 p-1.5 text-center text-sm text-primary">
            View
          </button>
        </div>
      </section>
    </Link>
  );
};

export default InlineJobCardJobDetailsPage;
