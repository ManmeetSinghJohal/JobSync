import React from "react";

import InlineJobCard from "@/components/Home/InlineJobCard";
import { searchJobs } from "@/lib/actions/companies.action";
import { Job } from "@/types";
import { getUserLocation } from "@/lib/actions/location.action";

const RecommendedJobs = async () => {
  let results: Job[];
  const userRecommandedQuery = await getUserLocation();
  const keyWords = ["software", "developer"];

  const query = `${keyWords}, ${userRecommandedQuery.country}`;

  try {
    results = await searchJobs({
      query,
    });
    results = results.sort(
      (a, b) => b.job_apply_quality_score - a.job_apply_quality_score
    );
  } catch (error) {
    console.log("Error fetching recommended jobs", error);
    throw error;
  }

  return (
    <section className="mt-[30px] flex flex-col items-center justify-center gap-[14px] rounded-[10px] bg-white px-[15px] py-[21px] shadow dark:bg-darkBg-2 max-sm:mb-[51px]">
      {results?.length
        ? results.map((job) => (
            <InlineJobCard
              key={job.job_id}
              employerName={job.employer_name}
              employerLogo={job.employer_logo}
              jobTitle={job.job_title}
              jobEmploymentType={job.job_employment_type}
              jobCity={job.job_city}
              jobState={job.job_state}
              jobMinSalary={job.job_min_salary}
              jobMaxSalary={job.job_max_salary}
              jobCountry={job.job_country}
              jobQualityScore={job.job_apply_quality_score}
            />
          ))
        : "No recommended jobs found"}
    </section>
  );
};

export default RecommendedJobs;
