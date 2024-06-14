import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Job } from "@/types";
import { searchJobs } from "@/lib/actions/companies.action";
import { CompanyDetailsCard, SimilarCompanyCard } from "@/components/index";

interface CompanyDetailsInterface {
  params: {
    id: string;
  };
}

const Page = async ({ params: { id } }: CompanyDetailsInterface) => {
  const jobs: Job[] = await searchJobs({
    employer: id,
    query: "Web Developer",
  });

  const similarCompanies: Job[] = await searchJobs({
    employer: "",
    query: "Web Developer",
  });

  console.log(similarCompanies);

  return (
    <section className="mx-auto min-h-screen w-full lg:max-w-5xl xl:max-w-7xl ">
      <Link href="/">
        <Button className="group relative  mb-11 mt-28 gap-1 rounded-[10px] !bg-natural-2 text-natural-6 transition duration-300 hover:!bg-natural-5  dark:!bg-darkBg-3 dark:hover:opacity-60">
          <Image
            src="/assets/icons/Cheveron-left.svg"
            alt="arrow-left"
            width={18}
            height={18}
            className=" invert transition-all ease-in-out group-hover:pr-1"
          />
          Back
        </Button>
      </Link>
      <div className="flex flex-col xl:flex-row xl:justify-between">
        <div className=" w-full xl:w-4/5 ">
          <CompanyDetailsCard jobs={jobs} />
        </div>
        <div className="mb-16 mt-24 bg-transparent px-2 xl:my-0 xl:w-1/3">
          <h2 className="mb-5 text-[22px] font-bold leading-8 dark:text-white">
            Similar Companies
          </h2>
          {similarCompanies
            .slice(0, 8)
            ?.map((job) => <SimilarCompanyCard key={job.job_id} job={job} />)}
        </div>
      </div>
    </section>
  );
};

export default Page;
