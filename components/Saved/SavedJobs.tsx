// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

import { getJobDetails } from "@/lib/actions/companies.action";
import InlineJobCardSavedPage from "./InlineJobCardSavedPage";

const SavedJobs = () => {
  const [userSavedJobs, setUserSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      // Access local storage and get the values
      const storedData = localStorage.getItem("savedJobs");

      // Parse the stored data if it exists
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        const jobsDetails = await Promise.all(
          parsedData.map(async (jobId) => {
            return await getJobDetails(jobId);
          })
        );

        setUserSavedJobs(jobsDetails);
      }
    };

    fetchSavedJobs();
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <>
      {userSavedJobs.map((job: object, index) => (
        <div
          className="m-3 flex h-[158px] rounded-xl bg-white shadow-jd dark:bg-darkBg-2"
          key={index}
        >
          <InlineJobCardSavedPage key={index} job={job.data[0]} />
        </div>
      ))}
    </>
  );
};

export default SavedJobs;
