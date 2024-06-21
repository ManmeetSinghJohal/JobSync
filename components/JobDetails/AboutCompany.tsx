import React from "react";

import { AboutCompanyProps } from "@/types";
import defaultLogo from "@/public/assets/icons/default-logo.svg";
import SaveCompanyButton from "./SaveCompanyButton";
import SafeImage from "../SafeImage";

const AboutCompany = ({
  employerName,
  employerLogo,
  jobDescription,
}: AboutCompanyProps) => {
  return (
    <div className="my-2 font-manrop">
      <h4 className="mb-5 mt-8 text-base font-medium text-black dark:text-white">
        About the Company
      </h4>
      <div className="mb-5 lg:mb-8 lg:flex lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-[46px] w-[46px] rounded border-2 border-white bg-white">
            <SafeImage
            defaultSrc={defaultLogo.src}
            src={employerLogo}
            alt="logo"
            width={64}
            height={64}
            className=" h-full w-full object-contain"
          />
          </div>
          <div>
            <h4 className="text-base font-medium text-black dark:text-white">
              {employerName}
            </h4>
          </div>
        </div>
        <div className="mt-3.5 w-48 rounded-xl border border-primary transition hover:scale-105 hover:dark:opacity-100">
          <SaveCompanyButton employerName={employerName}/>
        </div>
      </div>
      <p className="text-base font-light tracking-wide text-natural-7 dark:text-natural-5">
        {jobDescription}
      </p>
    </div>
  );
};

export default AboutCompany;
