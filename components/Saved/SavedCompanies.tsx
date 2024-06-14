// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

import { getCompaniesDetails } from "@/lib/actions/companies.action";
import CompanyCardSavedPage from "./CompanyCardSavedPage";

const SavedCompanies = () => {
  const [userSavedCompanies, setUserSavedCompanies] = useState<any>([]);

  useEffect(() => {
    const fetchSavedCompanies = async () => {
      // Access local storage and get the values
      const storedData = localStorage.getItem("savedCompanies");

      // Parse the stored data if it exists
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        const companiesDetails = await Promise.all(
          parsedData.map(async (name: any) => {
            return await getCompaniesDetails(name);
          })
        );

        setUserSavedCompanies(companiesDetails);
      }
    };

    fetchSavedCompanies();
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <>
      {userSavedCompanies.map((company: object, i) => (
        <div
          className="m-3 flex rounded-xl bg-white shadow-jd dark:bg-darkBg-2"
          key={i}
        >
          <CompanyCardSavedPage
            name={company[i]?.name}
            logo={company[i]?.logo}
            city={company[i]?.city}
            state={company[i]?.state}
            country={company[i]?.country}
            vacancies={company[i]?.vacancies}
            id={company[i]?.id}
          />
        </div>
      ))}
    </>
  );
};

export default SavedCompanies;
