/* eslint-disable camelcase */
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";
import { formatNumberWithExtension, removeCommasAndHyphens } from "@/lib/utils";
import { Job } from "@/types";

const CompanyReusableComponent = ({ job }: { job: Job }) => {
  const {
    job_publisher,
    job_country,
    employer_company_type,
    job_city,
    employer_website,
    job_onet_soc,
  } = job;

  return (
    <>
      <div className="my-4 flex w-full flex-col  dark:border-b dark:border-natural-8 sm:border-none md:w-2/3  ">
        <h2 className="text-[32px] font-bold leading-10 dark:text-white">
          {removeCommasAndHyphens(job_publisher)}
        </h2>
        <div className="my-3 flex flex-wrap items-center gap-1 text-[14px] font-medium leading-5 md:text-lg ">
          <div className="flex w-full items-center  text-natural-8 dark:text-natural-6">
            <span>{job_publisher}</span>
            <span className="mx-1 inline-block h-1 w-1 rounded-full bg-natural-7 dark:bg-natural-7"></span>
            <span className={job_city ? "inline-block" : "hidden"}>
              {job_city},
            </span>
            <span>{job_country}</span>
          </div>
          <div className="flex w-full items-center text-natural-6 dark:text-natural-7">
            <span>{employer_company_type}</span>
            <span className="mx-1 inline-block h-1 w-1  rounded-full bg-natural-7 dark:bg-natural-7"></span>
            <span>{formatNumberWithExtension(job_onet_soc)} Followers</span>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col sm:gap-5 md:ml-auto">
        <div className="my-[20px] rounded-xl  border border-primary transition hover:scale-105 hover:dark:opacity-100 sm:mt-0 ">
          <Link href={employer_website} target="_blank">
            <Button className="w-full !bg-transparent text-[15px] leading-normal tracking-wide text-primary duration-200 hover:opacity-90 dark:bg-transparent ">
              <Image
                src="/assets/icons/plus.svg"
                width={18}
                height={18}
                alt="plus-icon"
                className="mr-[10px] "
              />
              Visit Now
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CompanyReusableComponent;
