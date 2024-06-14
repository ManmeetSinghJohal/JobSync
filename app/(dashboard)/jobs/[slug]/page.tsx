import React, { Suspense } from "react";
import Image from "next/image";

import {
  DetailsLargeCard,
  InlineCardList,
  SearchBar,
  SkeletonLoader,
  SubPageHeading,
} from "@/components/index";

import cheveron from "@/public/assets/icons/Cheveron-left.svg";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: URLSearchParams;
}) => {
  const searchTitle = new URLSearchParams(searchParams).get("title") || "";

  return (
    <section
      id="jobs"
      className="min-h-screen bg-natural-3 p-6 dark:bg-darkBg-1 lg:p-8 xl:grid xl:auto-rows-min"
    >
      <div className="mb-[30px] mt-10 lg:mt-[50px] xl:mb-12">
        <SubPageHeading>Let’s find your dream job</SubPageHeading>
        <SearchBar route="/search" />
      </div>
      <div className="xl:grid xl:auto-rows-min">
        <div className="mb-7 flex h-7 items-center ">
          <button className="flex rounded-lg bg-natural-2 px-2.5 py-1.5 font-manrop text-xs text-natural-7 dark:bg-darkBg-3">
            <Image className="mr-1.5" src={cheveron} alt="arrow" height={15} />
            Back
          </button>
          <div className="ml-[59%] hidden font-manrop text-lg font-bold leading-6 text-black dark:text-white xl:block">
            Similar Jobs
          </div>
        </div>

        <div className="gap-10 xl:grid xl:grid-cols-[60%_auto]">
          <div className="mb-7 flex w-full gap-11 rounded-xl bg-white shadow-jd dark:bg-darkBg-2">
            <Suspense
              fallback={<SkeletonLoader className="h-full" numRows={1} />}
              key={params.slug}
            >
              <DetailsLargeCard jobId={params.slug} />
            </Suspense>
          </div>

          <div className="mb-6 font-manrop text-lg font-bold leading-6 text-black dark:text-white xl:hidden">
            Similar Jobs
          </div>

          <div>
            <Suspense
              fallback={<SkeletonLoader className="h-[158px]" numRows={9} />}
              key={params.slug}
            >
              <InlineCardList query={searchTitle} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
