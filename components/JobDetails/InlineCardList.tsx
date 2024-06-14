import { searchJobs } from "@/lib/actions/companies.action";
import InlineJobCardJobDetailsPage from "@/components/JobDetails/InlineJobCardJobDetailsPage";
import { Job } from "@/types";
export default async function InlineCardList({ query }: { query: string }) {
  const jobsList = await searchJobs({
    query: query || "software",
  });
  return (
    <>
      {jobsList?.map((job: Job) => (
        <div
          className="mb-7 flex h-[158px] rounded-xl bg-white shadow-jd dark:bg-darkBg-2"
          key={job.job_id}
        >
          <InlineJobCardJobDetailsPage key={job.job_id} job={job} />
        </div>
      ))}
    </>
  );
}
