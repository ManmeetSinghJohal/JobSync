/* eslint-disable camelcase */
"use client";

import Image from "next/image";
import CompanyLogo from "../shared/CompanyLogo";
import CompanyReusableComponent from "./CompanyReusableComponent";

import { Button } from "../ui/button";
import { Job } from "@/types";
import { useState } from "react";
import { Input } from "../ui/input";
import CompanyCard from "./CompanyCard";

const CompanyDetailsCard = ({ jobs }: { jobs: Job[] }) => {
  const { employer_logo } = jobs[0];
  const [seeAllJobs, setSeeAllJobs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const companyCardJobs = jobs.filter((job) => {
    const regex = new RegExp(searchQuery, "gi");
    return job.job_title.match(regex) || job.job_description.match(regex);
  });

  return (
    <section className=" min-w-[295px] rounded-[50px] dark:bg-darkBg-1  lg:max-w-5xl xl:mb-11 xl:w-full xl:max-w-[840px]">
      <div className="relative  mb-10 h-48 rounded-t-3xl bg-[url('/images/detailsBg.png')] bg-cover bg-no-repeat md:mb-16">
        <CompanyLogo
          src={employer_logo}
          alt="logo"
          width={64}
          height={64}
          fallbackSrc="/assets/icons/default-logo-alt.svg"
          className="absolute bottom-[-30px] left-5 !h-[64px] rounded-lg border-[3px] bg-natural-2 object-contain dark:border-dark"
        />
      </div>
      <div className="flex w-full items-center px-5 sm:flex-row">
        <CompanyReusableComponent job={jobs[0]} />
      </div>

      <div className="flex w-full flex-col items-center  rounded-md p-6 px-4 dark:bg-darkBg-2 sm:items-start md:px-5">
        <div className="relative flex w-full items-center rounded-xl bg-slate-50 px-2 focus-within:ring-2 dark:bg-darkBg-3 sm:w-1/2 lg:w-2/3">
          <Image
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search-icon"
            className="absolute"
          />
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            type="text"
            className=" h-14 border-none bg-transparent pl-8 placeholder:pl-4 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-natural-6"
            placeholder="Search Job title or Keyword"
          />
          <Button className=" h-9 self-center rounded-xl text-[13px] text-white transition-all duration-300 ease-in-out hover:mr-2  dark:hover:opacity-80">
            Search
          </Button>
        </div>
        <h4 className="py-5 text-[18px] font-bold dark:text-white">
          Recently Posted Job
        </h4>
        <div className="mb-14 flex w-full flex-col items-center space-y-5 sm:flex-row  sm:flex-wrap sm:justify-between sm:gap-7 sm:space-y-0 md:items-start">
          {companyCardJobs.length > 0 ? (
            companyCardJobs
              .slice(0, 4)
              .map((job) => <CompanyCard key={job.job_id} job={job} />)
          ) : (
            <div className="mx-auto">
              <h1 className="mt-10 text-center font-manrop text-[22px] font-bold leading-8 text-black dark:text-white lg:text-[32px] lg:leading-10">
                No Jobs Found
              </h1>
              <Image
                src="/images/no_results.svg"
                width={400}
                height={400}
                alt="no-jobs"
                loading="lazy"
                className="dark:opacity-90 dark:grayscale"
              />
            </div>
          )}
        </div>
        <Button
          onClick={() => setSeeAllJobs(true)}
          className={`${
            seeAllJobs || companyCardJobs.length === 0 ? "hidden" : "block"
          } mx-auto text-white hover:opacity-60 dark:bg-darkBg-3 dark:text-natural-4`}
        >
          See all Jobs
        </Button>
        {seeAllJobs && (
          <div className="mb-14 flex w-full flex-col items-center space-y-5 sm:flex-row  sm:flex-wrap sm:justify-between sm:gap-7 sm:space-y-0 md:items-start">
            {companyCardJobs.slice(4, companyCardJobs.length).map((job) => (
              <CompanyCard key={job.job_id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyDetailsCard;
