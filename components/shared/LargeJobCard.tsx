import React from "react";
import Link from "next/link";

import { Button } from "../ui/button";
import { Job } from "@/types";
import Tags from "./Tags";
import Salary from "./Salary";
import CompanyLogo from "@/components/shared/CompanyLogo";
import {
  extractKeywords,
  formatJobLocation,
  getDurationLeft,
  formatQualityScore,
  formatJobTitle,
} from "@/lib/utils";

interface LargeJobCardProps {
  job: Job;
}

const LargeJobCard = ({ job }: LargeJobCardProps) => {
  const {
    job_id: jobId,
    employer_logo: employerLogo,
    job_title: jobTitle,
    job_description: jobDescription,
    job_required_skills: jobRequiredSkills,
    job_highlights: { Qualifications: jobQualifications },
    job_apply_quality_score: jobQualityScore,
    job_offer_expiration_datetime_utc: jobExpiresAt,
    job_min_salary: jobMinSalary,
    job_max_salary: jobMaxSalary,
    job_salary_currency: jobSalaryCurrency,
    job_salary_period: jobSalaryPeriod,
    employer_name: employerName,
    job_city: jobCity,
    job_state: jobState,
  } = job;

  const tagWords = extractKeywords(
    jobRequiredSkills,
    jobQualifications,
    jobDescription
  );

  const daysLeft = getDurationLeft(jobExpiresAt);

  return (
    <Link
      href={`/jobs/${jobId}`}
      className="min-h-[428px] w-full min-w-[327px] lg:min-h-0"
    >
      <article className="inline-flex w-full flex-col items-start justify-start gap-5 rounded-[10px] bg-white px-4 py-5 shadow-inner dark:bg-darkBg-2">
        {/* Job title, company logo */}
        <div className="inline-flex h-[75px] w-full items-start justify-between gap-7">
          <div className="flex w-4/5 items-start justify-start gap-3">
            <div className="flex h-[45px] w-[45px] items-center justify-center gap-[7.03px] rounded-[7.03px] border-2 border-neutral-50 bg-natural-4 p-[5.62px] dark:border-darkBg-3 dark:bg-darkBg-3">
              <CompanyLogo
                className="h-full w-full"
                width={34}
                height={34}
                alt="company-logo"
                src={employerLogo}
                fallbackSrc="/assets/icons/default-logo-alt.svg"
              />
            </div>

            <div className="inline-flex max-w-[180px] flex-col items-start justify-start gap-1.5 lg:max-w-full">
              <div className="w-full truncate font-semibold leading-normal text-black dark:text-base dark:font-semibold dark:text-white">
                {formatJobTitle(jobTitle)}
              </div>

              {/* Employer name, Location and days left */}
              <div className="flex w-full flex-col items-start justify-start gap-[5px] lg:flex-row ">
                <div className="inline-flex w-full items-center justify-start gap-[5px] lg:w-auto lg:gap-0">
                  <div className="truncate text-sm font-medium text-natural-7 dark:text-natural-6">
                    {employerName}
                  </div>
                </div>
                <div className="hidden leading-snug text-natural-7 dark:text-natural-6 lg:block">
                  •
                </div>
                <div className="inline-flex w-auto items-center justify-start gap-2 truncate">
                  <div className="w-full truncate text-sm font-medium text-natural-7 dark:text-natural-6 lg:w-auto">
                    {formatJobLocation(jobCity, jobState)}
                  </div>

                  {daysLeft && (
                    <div className="flex gap-2">
                      <div className="leading-snug text-natural-7 dark:text-natural-6">
                        •
                      </div>
                      <div className="truncate text-sm font-medium text-natural-7 dark:text-natural-6">
                        {daysLeft}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Save button */}
          {/* <div className="flex items-center justify-center gap-1.5 rounded-[10px] bg-natural-3 px-[10px] py-[7px] dark:bg-darkBg-3">
            <div className="hidden text-sm font-medium leading-tight text-natural-6 sm:block">
              Save Job
            </div>
            <Image
              src="/assets/icons/archive.svg"
              width={19}
              height={19}
              alt="save"
            />
          </div> */}
        </div>

        {/* Job description */}
        <div className="line-clamp-6 h-auto w-full overflow-hidden text-[13px] font-normal leading-snug text-natural-7 dark:text-natural-6 lg:line-clamp-2">
          {jobDescription}
        </div>

        {/* Tags */}
        <div className="inline-flex w-full items-center justify-start gap-[5px]">
          {tagWords.length > 0 && (
            <div className="flex gap-[5px]">
              <Tags
                tags={tagWords}
                extraStyles="text-natural-6 font-medium !px-2"
                largeCard={true}
              />
            </div>
          )}
        </div>

        {/* Salary, applicants */}
        <div className="flex w-full flex-col items-center justify-start gap-[30px] lg:flex-row lg:justify-between lg:gap-[35px]">
          <div className="inline-flex w-full items-center justify-between gap-9 lg:w-[355px] lg:justify-start">
            <Salary
              buttonName="Apply Now"
              minSalary={jobMinSalary}
              maxSalary={jobMaxSalary}
              currency={jobSalaryCurrency}
              period={jobSalaryPeriod}
            />

            <div className="flex w-full items-center justify-end gap-2 lg:w-auto lg:justify-start lg:text-lg">
              <div className="font-medium leading-normal text-natural-7 dark:text-natural-6">
                Quality Score:
              </div>
              <div className="font-semibold leading-normal text-black dark:text-base dark:text-white">
                {jobQualityScore ? formatQualityScore(jobQualityScore) : "N/A"}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full items-start justify-between gap-5 lg:w-auto">
            <Button className="h-[38px] w-[141px] bg-primary text-[13px] font-semibold leading-tight text-white duration-200 hover:opacity-90">
              Apply Now
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default LargeJobCard;
