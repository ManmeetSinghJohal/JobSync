import React from "react";

import { monthlySalaryRange } from "@/lib/utils";
import { SalaryProps } from "@/types";

const Salary = ({ minSalary, maxSalary, currency, period }: SalaryProps) => {
  const monthlySalary = monthlySalaryRange({
    minSalary,
    maxSalary,
    currency,
    period,
  });
  return (
    <>
      {monthlySalary && (
        <div className="flex w-full items-center justify-start gap-0.5 lg:w-auto">
          <span className="text-base font-semibold leading-normal text-gray-900 dark:text-white lg:text-lg">
            {monthlySalary}
          </span>
          <span className="font-medium leading-normal text-natural-7 dark:text-natural-6 lg:text-lg">
            /month
          </span>
        </div>
      )}
    </>
  );
};

export default Salary;
