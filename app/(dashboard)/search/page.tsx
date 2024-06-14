import { Suspense } from "react";

import {
  Pagination,
  SearchBar,
  SearchFilters,
  SearchResults,
  SkeletonLoader,
  SubPageHeading,
} from "@/components/index";
import { getUserLocation } from "@/lib/actions/location.action";
import {
  getSearchFilters,
  getTotalPages,
} from "@/lib/actions/companies.action";
import { SearchParamsProps } from "@/types";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const {
    query = "Web Developer",
    location,
    employmentTypes,
    jobRequirements,
    datePosted,
    jobTitles,
    companyTypes,
    employer,
    page,
    sort,
  } = searchParams;
  const userLocation = await getUserLocation();

  const newLocation = location || `${userLocation.country}`;

  const newQuery = `${query}${newLocation ? ` in ${newLocation}` : ""}`;

  const totalPages = await getTotalPages(newQuery);

  const searchQuery = {
    query: newQuery,
    location: newLocation,
    employmentTypes,
    jobRequirements,
    jobTitles,
    companyTypes,
    employer,
    datePosted,
    page,
    sort,
  };

  const jobSearchFilters = await getSearchFilters({
    query: newQuery,
  });

  return (
    <section
      id="search"
      className="min-h-screen w-full justify-center bg-gray-50 pt-[4.375rem] dark:bg-darkBg-1 "
    >
      <div className="flex w-full flex-col gap-10 pb-10">
        <header className="mb-[59px]">
          <SubPageHeading>Let’s find your dream job</SubPageHeading>
          <SearchBar route="/search" />
        </header>

        <div className="flex gap-20">
          <aside className="mt-2 hidden min-w-[251px] max-w-[251px] lg:w-1/4 xl:block">
            <SearchFilters data={jobSearchFilters} />
          </aside>
          <section className="flex w-full flex-col gap-6">
            <Suspense
              fallback={<SkeletonLoader className="h-[284px]" numRows={10} />}
              key={JSON.stringify(searchQuery)}
            >
              <SearchResults searchQuery={searchQuery} />
            </Suspense>

            <footer className="flex h-[60px] w-full items-center justify-between border-t border-gray-100 pt-5 dark:border-darkBg-2">
              <Pagination
                pageNumber={page ? +page : 1}
                totalPages={totalPages}
              />
            </footer>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Page;
