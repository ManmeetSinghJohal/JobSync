"use client";

import React from "react";
import Link from "next/link";

import Tags from "@/components/shared/Tags";
import Metric from "@/components/shared/Metric";
import Image from "next/image";

import { Job } from "@/types";
import { Button } from "../ui/button";
import JobCardCompanyLogo from "@/components/Home/JobCardCompanyLogo";

import {
  extractKeywords,
  removeCommasAndHyphens,
  formatString,
} from "@/lib/utils";
import { usePathname } from "next/navigation";

const JobCard2 = ({ job }: { job: Job }) => {
  const pathname = usePathname();

  const {
    job_id: jobId,
    job_title: jobTitle,
    job_description: jobDescription,
    job_posted_at_datetime_utc: jobPostedAt,
    job_offer_expiration_datetime_utc: jobExpiresAt,
    job_employment_type: jobEmploymentType,

    employer_logo: employerLogo,
    job_required_skills: jobRequiredSkills,
    job_highlights: { Qualifications: jobQualifications },
  } = job;

  const tagWords = extractKeywords(
    jobRequiredSkills,
    jobQualifications,
    jobDescription
  );

  return (
    <Link href={`/jobs/${jobId}`}>
      <article className="flex  min-h-[295px] w-full flex-col justify-between space-y-5 rounded-md bg-white p-5 shadow-lg  dark:bg-darkBg-3  lg:max-w-[470px] xl:max-w-[370px]">
        <Image
          src="/assets/icons/ic-more.svg"
          alt="dots"
          width={20}
          height={20}
          className="absolute right-5 top-9"
        />
        <div className="flex w-full items-center gap-[18px] md:gap-2  lg:gap-5">
          {/* Company Logo */}
          <div className="rounded-lg bg-slate-100 px-2 py-[2px] dark:bg-darkBg-2  ">
            <JobCardCompanyLogo
              className=" !h-[48px] object-contain dark:invert"
              width={48}
              height={48}
              alt="logo"
              src={employerLogo}
              fallbackSrc="/assets/icons/default-logo.svg"
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
        <div className="flex items-center justify-between">
          <Button className="h-[40px]  w-[94px] rounded-[10px] bg-primary !px-[14px] !py-2 text-[13px] tracking-wide text-white opacity-60 transition-all duration-200 ease-in-out hover:mr-[3px] hover:opacity-90 dark:bg-primary dark:hover:shadow-lg ">
            Visit Now
          </Button>
        </div>
      </article>
    </Link>
  );
};

export default JobCard2;
