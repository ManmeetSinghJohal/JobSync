import React from "react";

import LargeJobCard from "@/components/shared/LargeJobCard";
import { NoResult } from "@/components/index";
import { Job } from "@/types";
import { searchJobs } from "@/lib/actions/companies.action";
import SortSelector from "./SortSelector";

interface SearchResultsProps {
  searchQuery: {
    query: string;
    location?: string | null;
    employmentTypes?: string | null;
    jobRequirements?: string | null;
    datePosted?: string | null;
    jobTitles?: string | null;
    companyTypes?: string | null;
    employer?: string | null;
    page?: string | null;
    sort?: string | null;
  };
}

const SearchResults = async ({ searchQuery }: SearchResultsProps) => {
  const jobs: Job[] = await searchJobs(searchQuery);

  if (jobs.length === 0) {
    return (
      <NoResult
        title="Your search has returned no results"
        description="Try refining your query! You can do it! 🚀"
      />
    );
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <section className="flex w-full items-center justify-between">
          <div className="flex gap-2 text-lg leading-normal">
            <span className="font-semibold text-neutral-400">Showing:</span>
            <span className="font-bold text-gray-900 dark:text-white">
              {jobs.length} Jobs
            </span>
          </div>

          <div className="flex h-auto w-auto flex-col items-start justify-center gap-2.5">
            <div className="flex flex-col items-start justify-end px-2.5">
              <div className="flex items-center justify-between gap-1 text-sm font-semibold text-neutral-400">
                <div className="whitespace-nowrap text-center">Sort by:</div>
                <SortSelector
                  extraClasses={
                    "text-gray-900 dark:text-white focus-visible:ring-0 focus:ring-0 justify-end gap-[19px] mt-0"
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <article className="flex flex-col gap-[22px]">
        {jobs.map((job) => (
          <LargeJobCard key={job.job_id} job={job} />
        ))}
      </article>
    </>
  );
};

export default SearchResults;
