/* eslint-disable camelcase */
import React from "react";
import Link from "next/link";

import defaultLogo from "@/public/assets/icons/default-logo.svg";

import Requirements from "./Requirements";
import Responsibility from "./Responsibility";
import Qualifications from "./Qualifications";
import AboutCompany from "./AboutCompany";
import Apply from "./Apply";
import SaveJobButton from "./SaveJobButton";
import { getJobDetails } from "@/lib/actions/companies.action";
import SafeImage from "../SafeImage";

const DetailsLargeCard = async ({ jobId }: { jobId: string }) => {
  const job = await getJobDetails(jobId);

  const {
    employer_logo: employerLogo,
    job_description: jobDescription,
    job_employment_type: jobEmploymentType,
    job_min_salary: jobMinSalary,
    employer_name: employerName,
    job_required_experience: jobRequiredExperience,
    job_job_title: jobJobTitle,
    job_highlights: jobHighlights,
    job_apply_link: jobApplyLink,
  } = job?.data[0] || {};

  const requiredExperience =
    jobRequiredExperience?.required_experience_in_months / 12;

  return (
    <div className="m-5 mb-[36px] w-full rounded-2xl p-1 font-manrop dark:bg-darkBg-2">
      <div className="relative mb-7 h-48 rounded-t-3xl bg-[url('/images/detailsBg.png')] bg-cover bg-no-repeat lg:mb-[70px]">
        <div className="absolute bottom-[-14px] left-[10px] h-[46px] w-[46px] rounded border-2 border-white bg-white lg:bottom-[-41px] lg:left-[20px] lg:h-16 lg:w-16">
          <SafeImage
            defaultSrc={defaultLogo.src}
            src={employerLogo}
            alt="logo"
            width={46}
            height={46}
            className=" h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="">
        <Apply job={job.data[0]} />

        <Requirements
          employmentType={jobEmploymentType}
          minSalary={jobMinSalary}
          jobTitle={jobJobTitle}
          jobExperience={requiredExperience}
        />

        <div className="mt-5 flex justify-center gap-x-3.5 md:justify-evenly lg:hidden">
          <Link href={jobApplyLink} rel="noopener noreferrer" target="_blank">
            <button className="w-[130px] rounded-lg bg-primary px-3.5 py-2.5 text-[15px] leading-normal tracking-wide text-white  ">
              Apply Now
            </button>
          </Link>
          <SaveJobButton jobId={jobId} />
        </div>

        {/* Job description  */}
        <div className="mt-[30px]">
          {jobDescription && (
            <h4 className="text-base font-medium text-black dark:text-white">
              About The Job
            </h4>
          )}
          <p className="mb-10 mt-[10px] text-sm font-light tracking-wide text-natural-7 dark:text-natural-5">
            {jobDescription}
          </p>
        </div>

        <div className="my-1 h-[1px] w-full bg-natural-2 dark:bg-dark" />

        {/* Job responsibility's  */}
        <div className="my-[30px]">
          {jobHighlights.Responsibilities && (
            <h4 className="mb-2 text-base font-medium text-black dark:text-white">
              Responsibilities
            </h4>
          )}
          {jobHighlights?.Responsibilities?.map(
            (item: string[], index: number) => (
              <Responsibility item={item} key={index} />
            )
          )}
        </div>

        {jobHighlights.Responsibilities && (
          <div className="my-1 h-[1px] w-full bg-natural-2 dark:bg-dark" />
        )}

        {/* Job Qualifications  */}
        <div className="my-[30px]">
          {jobHighlights.Qualifications && (
            <h4 className="mb-2 text-base font-medium text-black dark:text-white">
              Qualifications and Skill Sets
            </h4>
          )}
          {jobHighlights?.Qualifications?.map(
            (item: string[], index: number) => (
              <Qualifications item={item} key={index} />
            )
          )}
        </div>

        {jobHighlights.Qualifications && (
          <div className="my-1 h-[1px] w-full bg-natural-2 dark:bg-dark" />
        )}

        {/* About the Company */}
        {employerName && jobDescription && (
          <AboutCompany
            employerName={employerName}
            employerLogo={employerLogo || defaultLogo}
            jobDescription={jobDescription}
          />
        )}
      </div>
    </div>
  );
};

export default DetailsLargeCard;
