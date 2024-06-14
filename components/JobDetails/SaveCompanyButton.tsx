"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const buttonStyle =
  "w-full items-center !bg-transparent text-[15px] tracking-wide text-primary duration-200 hover:opacity-90";

const SaveCompanyButton = ({ employerName }: { employerName: string }) => {
  const [savedCompanies, setSavedCompanies] = useState<string[] | null>(null);

  useEffect(() => {
    setSavedCompanies(
      JSON.parse(localStorage.getItem("savedCompanies") || "[]")
    );
  }, []);

  useEffect(() => {
    if (savedCompanies !== null)
      localStorage.setItem("savedCompanies", JSON.stringify(savedCompanies));
  }, [savedCompanies]);

  const saveCompany = () => {
    if (savedCompanies === null) return;
    const newItem = employerName;
    if (savedCompanies?.includes(newItem)) {
      const index = savedCompanies.indexOf(newItem);
      if (index > -1) {
        setSavedCompanies((prev) => {
          if (!prev) return prev;
          return prev.slice(0, index).concat(prev.slice(index + 1));
        });
        return;
      }
    }
    setSavedCompanies((prev) => {
      if (!prev) return null;
      return [...prev, newItem];
    });
  };

  const isSaved =
    savedCompanies?.findIndex((name) => name === employerName) !== -1;

  return (
    <Button
      className={buttonStyle}
      onClick={saveCompany}
      disabled={savedCompanies === null}
    >
      {isSaved ? "Saved" : "Save Company"}
    </Button>
  );
};

export default SaveCompanyButton;
