import React from "react";

import moment from "moment";

const SubPageHeading = ({ children }: { children: React.ReactNode }) => {
  const currentDate = moment().format("MMMM Do YYYY");
  return (
    <div className="flex flex-col">
      <h1 className="mt-10 font-manrop text-[22px] font-bold leading-8 text-black dark:text-white lg:text-[32px] lg:leading-10">
        {children}
      </h1>
      <p className="mb-[30px] mt-3 font-manrop text-[16px] font-medium leading-6 text-natural-6 lg:mb-[34px] lg:text-xl">
        {currentDate}
      </p>
    </div>
  );
};

export default SubPageHeading;
