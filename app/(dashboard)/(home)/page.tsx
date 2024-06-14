import {
  FeaturedCompanies,
  LatestJobs,
  RecommendedJobs,
  SubPageHeading,
} from "@/components/index";

import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <div className="flex w-full pt-[4.375rem] ">
        <SubPageHeading>
          Welcome to the Job Search Platform for Developers
        </SubPageHeading>
      </div>

      <div id="home" className="w-full bg-natural-3 dark:bg-darkBg-1 ">
        <div className="mt-9 grid grid-cols-1 items-start justify-start gap-10  xl:grid-cols-[66%_33%]">
          <div className="items-center justify-between">
            <div className="flex w-full justify-between">
              <h2 className="font-manrop text-[22px] font-semibold leading-loose text-gray-900 dark:text-white sm:font-bold">
                Latest Job Posts
              </h2>
              <Button className="w-[75px] self-center rounded-[10px] border-[1px] border-natural-2 bg-natural-3 px-[10px] py-[7px] font-manrop text-[16px] font-medium text-natural-7 hover:text-white dark:border-natural-7 dark:bg-darkBg-1 hover:dark:bg-primary hover:dark:text-white xl:!mr-6">
                See All
              </Button>
            </div>

            <LatestJobs />
          </div>

          <div className="xl:order-last xl:mt-[-100px]">
            <h2 className="font-manrop text-[22px] font-semibold leading-loose text-gray-900 dark:text-white sm:font-bold">
              Featured Companies
            </h2>

            <FeaturedCompanies />
          </div>
          <div className=" items-center justify-between">
            <div className="flex w-full justify-between ">
              <h2 className="font-manrop text-[22px] font-semibold leading-loose  text-gray-900 dark:text-white sm:font-bold">
                Recommended For You
              </h2>
              <Button className="w-[75px] self-center rounded-[10px] border-[1px] border-natural-2 bg-natural-3 px-[10px] py-[7px] font-manrop text-[16px] font-medium text-natural-7 hover:text-white dark:border-natural-7 dark:bg-darkBg-1 hover:dark:bg-primary hover:dark:text-white">
                See All
              </Button>
            </div>
            <RecommendedJobs />
          </div>
        </div>
      </div>
    </>
  );
}
