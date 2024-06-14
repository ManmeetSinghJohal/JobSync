import React from "react";

import OvalImage from "./OvalImage";
import { getTimestamp, location } from "@/lib/utils";

interface MetricProps {
  jobPostedAt: string;
  employerName: string;
  jobCity: string;
  jobState: string;
  jobCountry: string;
}

const Metric = ({
  employerName,
  jobCity,
  jobState,
  jobPostedAt,
  jobCountry,
}: MetricProps) => {
 
  return (
    <div className="flex flex-col font-manrop text-[13px] font-medium text-natural-7 md:flex-row lg:text-base xl:text-[13px]">
      <div className="flex">
        {Boolean(employerName) && <span>{employerName}</span>}
        <OvalImage className={"hidden md:block"} />
      </div>
      <div className="flex">
        <span>{location(jobCity, jobState, jobCountry)}</span>
        <OvalImage />
        {!!jobPostedAt && <span>{getTimestamp(jobPostedAt)}</span>}
      </div>
    </div>
  );
};

export default Metric;
