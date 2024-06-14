import React from "react";
import Metric from "../shared/Metric2";
import Link from "next/link";

import { Job } from "@/types";
import SaveButton from "./SaveJobButton";

const Apply = ({ job }: { job: Job }) => {
  return (
    <div className="mb-1.5 lg:flex lg:justify-between">
      <div>
        <div>
          <h3 className="font-manrop text-base font-medium text-black dark:text-white lg:text-2xl lg:font-bold xl:text-xl">
            {job?.job_title.split("-")[0]}
          </h3>
        </div>

        <Metric
          jobPostedAt={job?.job_posted_at_datetime_utc}
          employerName={job?.employer_name}
          jobCity={job?.job_city}
          jobState={job?.job_state}
          jobCountry={job?.job_country}
        />
      </div>

      <div className="hidden lg:flex">
        <Link
          href={job?.job_apply_link}
          rel="noopener noreferrer"
          target="_blank"
          className="ml-2 mr-4 h-[44px] w-[130px] rounded-lg bg-primary px-3.5 py-2.5 text-center text-[15px] leading-normal tracking-wide text-white"
        >
          Apply Now
        </Link>
        <SaveButton jobId={job.job_id} />
      </div>
    </div>
  );
};

export default Apply;
