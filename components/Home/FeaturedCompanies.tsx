import React from "react";

import CompanyCard from "@/components/Home/CompanyCard";
import { getCompaniesDetails } from "@/lib/actions/companies.action";
import { Company } from "@/types";

const FeaturedCompanies = async () => {
  const companies: Company[] = await getCompaniesDetails({
    query: "Web Developer",
  });

  return (
    <section className="mb-5 mt-[30px] flex w-full flex-col justify-start gap-[40px] max-sm:mt-[30px] md:grid md:max-w-[956px] md:grid-cols-3 lg:mt-[20px]">
      {companies?.length ? (
        companies?.map((company) => (
          <CompanyCard
            key={company.id}
            name={company.name}
            logo={company.logo}
            city={company.city}
            state={company.state}
            country={company.country}
            vacancies={company.vacancies}
            id={company.id}
          />
        ))
      ) : (
        <div className="text-center">No companies found</div>
      )}
    </section>
  );
};

export default FeaturedCompanies;
