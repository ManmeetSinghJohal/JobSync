import React from "react";
import Image from "next/image";

import SubPageHeading from "@/components/shared/SubPageHeading";
import cheveron from "@/public/assets/icons/Cheveron-left.svg";
import SavedCompanies from "@/components/Saved/SavedCompanies";
import SavedJobs from "@/components/Saved/SavedJobs";

const Page = () => {
  return (
    <section
      id="saved"
      className="min-h-screen w-full bg-natural-3 p-6 dark:bg-darkBg-1"
    >
      <div className="mb-[30px] mt-10 lg:mt-[50px] xl:mb-12">
        <SubPageHeading>Here are your saved jobs and companies</SubPageHeading>
      </div>

      <div>
        <button className="mb-6 flex rounded-lg bg-natural-2 px-2.5 py-1.5 font-manrop text-xs text-natural-7 dark:bg-darkBg-3">
          <Image className="mr-1.5" src={cheveron} alt="arrow" height={15} />
          Back
        </button>

        <div>
          <div>
            <div className="mb-6 font-manrop text-lg font-bold leading-6 text-black dark:text-white">
              Saved Jobs
            </div>

            <div className="mb-7 grid w-full rounded-xl shadow-jd dark:bg-darkBg-2 lg:grid-cols-2 xl:grid-cols-3">
              <SavedJobs />
            </div>
          </div>

          <div>
            <div className="mb-6 font-manrop text-lg font-bold leading-6 text-black dark:text-white">
              Saved Companies
            </div>

            <div className="mb-7 grid w-full rounded-xl shadow-jd dark:bg-darkBg-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <SavedCompanies />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
