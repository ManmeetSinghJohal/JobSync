"use client";

import React from "react";
import Link from "next/link";

import Tags from "@/components/shared/Tags";
import Metric from "@/components/shared/Metric";

import { Job } from "@/types";
import { Button } from "../ui/button";
import JobCardCompanyLogo from "@/components/Home/JobCardCompanyLogo";
import {
  extractKeywords,
  removeCommasAndHyphens,
  formatString,
} from "@/lib/utils";
import { usePathname } from "next/navigation";

const CompanyCard = ({ job }: { job: Job }) => {
  const pathname = usePathname();
  const {
    job_id: jobId,
    job_title: jobTitle,
    job_description: jobDescription,
    job_employment_type: jobEmploymentType,
    job_posted_at: jobPostedAt,
    job_expires_at: jobExpiresAt,
    employer_logo: employerLogo,
    job_required_skills: jobRequiredSkills,
    job_qualifications: jobQualifications,
  } = job;

  const tagWords = extractKeywords(
    jobRequiredSkills,
    jobQualifications,
    jobDescription
  );

  return (
    <Link href={`/jobs/${jobId}`}>
      <article className="relative  flex min-h-[295px] flex-col justify-between space-y-5 rounded-md bg-white p-5 shadow-lg  dark:bg-darkBg-3 max-sm:w-[295px] lg:max-w-[470px] xl:max-w-[370px]">
        <div className="flex w-full items-center gap-[18px] md:gap-2  lg:gap-5">
          <div className="rounded-lg bg-slate-100 px-2 py-[2px] dark:bg-darkBg-2  ">
            <JobCardCompanyLogo
              className=" !h-[48px] object-contain dark:invert"
              width={48}
              height={48}
              alt="logo"
              src={employerLogo}
              fallbackSrc="/assets/icons/default-logo-alt.svg"
            />
          </div>
          <div className="flex w-full flex-col">
            <h3 className="mb-1 line-clamp-1 text-[16px] font-semibold leading-6 dark:text-white lg:text-[18px]">
              {removeCommasAndHyphens(jobTitle)}
            </h3>
            {tagWords.length > 0 && <Tags tags={tagWords} />}
          </div>
        </div>
        <p className="line-clamp-4 font-manrop text-[15px] font-normal capitalize leading-[22px] text-natural-7 md:text-base md:leading-normal xl:line-clamp-3">
          {formatString(jobDescription)}
        </p>
        {!pathname.startsWith("/company-details/") && (
          <Metric
            contract={jobEmploymentType}
            jobPostedAt={jobPostedAt}
            jobExpiration={jobExpiresAt}
          />
        )}
        <div className="ml-auto flex items-center justify-between">
          <Button className="btn-visit">Visit Now</Button>
        </div>
      </article>
    </Link>
  );
};

export default CompanyCard;
