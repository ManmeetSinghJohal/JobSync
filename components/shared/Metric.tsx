import React from "react";
import Image from "next/image";

import { Badge } from "../ui/badge";
import {
  formatEmploymentType,
  getDurationLeft,
  getTimestamp,
} from "@/lib/utils";
import { MetricProps } from "@/types";
import useRandomNumber from "../Home/RandomApplicants";

const Metric = ({ contract, jobExpiration, jobPostedAt }: MetricProps) => {
  let duration;

  if (!jobExpiration) {
    duration = getTimestamp(jobPostedAt);
  } else if (jobExpiration) {
    duration = getDurationLeft(jobExpiration); // Set its value here
  }
  const randomNumber = useRandomNumber();

  return (
    <div className="mt-1 flex w-full flex-wrap items-center justify-start gap-3">
      <Badge className="flex items-center gap-1  rounded-[5px] py-[6px] text-sm capitalize  leading-snug dark:bg-darkBg-3  md:!px-[3px] md:py-[6px]">
        <Image
          src="/assets/icons/briefcase.svg"
          width={18}
          height={18}
          alt="briefcase"
        />
        <p className="ml-1 text-[12px] capitalize dark:text-natural-6 lg:text-[14px] xl:ml-0">
          {formatEmploymentType(contract)}
        </p>
      </Badge>

      <Badge className="flex items-center gap-1  rounded-[5px] py-[6px] text-sm capitalize  leading-snug dark:bg-darkBg-3  md:!px-[3px] md:py-[6px]">
        <Image
          src="/assets/icons/people.svg"
          width={18}
          height={18}
          alt="briefcase"
        />
        <p className="whitespace-nowrap px-2 text-[12px] dark:text-natural-6 lg:text-[14px]">
          {randomNumber} Applicants
        </p>
      </Badge>

      <Badge className="flex items-center gap-1  rounded-[5px] py-[6px] text-sm capitalize  leading-snug dark:bg-darkBg-3  md:!px-[3px] md:py-[6px]">
        <Image
          src="/assets/icons/clock.svg"
          width={18}
          height={18}
          alt="briefcase"
        />
        <p className="ml-1 flex flex-row whitespace-nowrap  text-[12px] dark:text-natural-6 md:ml-2 lg:text-[14px]">
          {jobExpiration ? duration : "Posted " + duration}
        </p>
      </Badge>
    </div>
  );
};

export default Metric;
