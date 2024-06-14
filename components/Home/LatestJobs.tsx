import { searchJobs } from "@/lib/actions/companies.action";
import React from "react";
import JobCard from "@/components/Home/JobCard";
import { Job } from "@/types";

const LatestJobs = async () => {
  const jobs: Job[] = (
    await searchJobs({
      query: "Web Developer",
      datePosted: "week",
    })
  )?.slice(0, 4);

  return (
    <section className="mt-[33px] flex w-full flex-col items-center justify-center gap-[40px] rounded-[10px] md:grid md:grid-cols-2">
      {jobs?.length &&
        jobs.map((job) => <JobCard key={job.job_id} job={job} />)}
    </section>
  );
};

export default LatestJobs;
