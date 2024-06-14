"use client";

import React, { useEffect, useState } from "react";

const buttonStyle =
  "h-[44px] w-[130px] rounded-lg border-[1px] border-natural-5 bg-white px-3.5 py-2.5 text-[15px] leading-normal tracking-wide text-zinc-500 dark:border-natural-8 dark:bg-transparent";

const SaveJobButton = ({ jobId }: { jobId: string }) => {
  const [savedJobs, setSavedJobs] = useState<string[] | null>(null);

  useEffect(() => {
    setSavedJobs(JSON.parse(localStorage.getItem("savedJobs") || "[]"));
  }, []);

  useEffect(() => {
    if (savedJobs !== null) localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  const saveJobs = () => {
    if (savedJobs === null) return;

    const newItem = jobId;
    if (savedJobs?.includes(newItem)) {
      const index = savedJobs.indexOf(newItem);
      if (index > -1) {
        setSavedJobs((prev) => {
          if (!prev) return prev;
          return prev.slice(0, index).concat(prev.slice(index + 1));
        });
        return;
      }
    }

    setSavedJobs((prev) => {
      if (!prev) return null;
      return [...prev, newItem];
    });
  };

  const isSaved = savedJobs?.findIndex((id) => id === jobId) !== -1;

  return (
    <button
      className={buttonStyle}
      onClick={saveJobs}
      disabled={savedJobs === null}
    >
      {isSaved ? "Saved" : "Save Job"}
    </button>
  );
};

export default SaveJobButton;
