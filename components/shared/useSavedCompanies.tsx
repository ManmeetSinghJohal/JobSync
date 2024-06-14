import { useState, useEffect } from "react";

const useSavedCompanies = () => {
  const [savedCompanies, setSavedCompanies] = useState<string[] | null>([]);

  useEffect(() => {
    // Load saved companies from local storage on mount
    setSavedCompanies(
      JSON.parse(localStorage.getItem("savedCompanies") || "[]")
    );
  }, []);

  useEffect(() => {
    // Save updated companies to local storage whenever savedCompanies changes
    if (savedCompanies !== null) {
      localStorage.setItem("savedCompanies", JSON.stringify(savedCompanies));
    }
  }, [savedCompanies]);

  return {savedCompanies, setSavedCompanies};
};

export default useSavedCompanies;
