import React from "react";

import { getEstimatedSalary } from "@/lib/actions/companies.action";
import {
  ChartCard,
  EstimatedSalariesForm,
  SubPageHeading,
} from "@/components/index";
import Script from "next/script";

interface Props extends URLSearchParams {
  jobTitle: string;
  location: string;
  radius?: string;
}

const Page = async ({ searchParams }: { searchParams: Props }) => {
  const { jobTitle, location, radius } = searchParams;

  const estimatedSalary = getEstimatedSalary({
    jobTitle,
    location,
    radius,
  });

  return (
    <section className=" mx-5 min-h-screen w-full pt-[4.375rem] dark:bg-darkBg-1 max-xl:w-[618px] max-sm:w-[300px] ">
      <Script src="https://www.google.com/recaptcha/api.js" />
      <div className="flex flex-col gap-5 pr-5 xl:flex-row xl:gap-[90px]">
        <div className="flex flex-col xl:w-1/2 ">
          <SubPageHeading>Estimated Salaries</SubPageHeading>
          <div className="w-full">
            <EstimatedSalariesForm status={estimatedSalary} />
          </div>
        </div>
        <div className="rounded-[10px] bg-natural-2 dark:bg-darkBg-2 lg:mt-[62px] xl:w-1/2">
          {!jobTitle || !location ? (
            <div className="flex h-full items-center justify-center p-4">
              <p className="text-center text-2xl text-gray-400 dark:text-gray-500">
                Please enter a <span className="text-primary">job title</span>{" "}
                and <span className="text-primary">location</span> to see
                estimated salaries
              </p>
            </div>
          ) : (
            <ChartCard
              jobTitle={jobTitle}
              location={location}
              search={estimatedSalary}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
