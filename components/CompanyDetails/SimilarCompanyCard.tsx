/* eslint-disable camelcase */
"use client";
import React from "react";
import Image from "next/image";

import CompanyLogo from "../shared/CompanyLogo";
import Link from "next/link";

import { removeCommasAndHyphens } from "@/lib/utils";
import { Button } from "../ui/button";

interface SimilarCompaniesProps {
  employer_logo: string;
  employer_name: string;
  job_apply_link: string;
}

const SimilarCompanyCard = ({ job }: { job: SimilarCompaniesProps }) => {
  const { employer_logo, employer_name, job_apply_link } = job;

  return (
    <aside className="mb-6 shadow-md">
      <div className="flex items-center justify-between rounded-[10px] p-5 dark:bg-darkBg-2">
        <div className="flex dark:bg-transparent">
          <CompanyLogo
            fallbackSrc="/assets/icons/default-logo-alt.svg"
            src={employer_logo}
            alt="company-logo"
            width={48}
            height={48}
            className="mr-[10px] !h-12 rounded-full object-contain  text-white dark:invert"
          />
          <div className="ml-4 flex flex-col">
            <div className="mb-[6px] line-clamp-1 !text-[18px] font-semibold capitalize dark:text-white">
              {removeCommasAndHyphens(employer_name).split(" ")[0]}
            </div>
            <div className="text-sm leading-5 text-natural-6">
              {removeCommasAndHyphens(employer_name)}
            </div>
          </div>
        </div>

        <Link href={job_apply_link} target="_blank">
          <Button className=" h-9 rounded-[10px] border border-primary  !bg-transparent text-primary transition hover:scale-105  dark:bg-transparent  ">
            <Image
              src="/assets/icons/plus.svg"
              width={18}
              height={18}
              alt="plus-icon"
              className="mr-[10px]  text-white "
            />
            Visit
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default SimilarCompanyCard;
