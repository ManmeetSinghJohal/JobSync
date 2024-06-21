"use server";

import { Company, Job } from "@/types";
import {
  searchJobParams,
  searchCompaniesParams,
  getCompanyDetailsParams,
  searchEstimatedSalaries,
  searchFiltersParams,
} from "./shared.types";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.JSEARCH_API_KEY!,
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  },
};

export const getJobDetails = async (id: string) => {
  const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${id}&extended_publisher_details=false`;

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const searchJobs = async (params: searchJobParams) => {
  try {
    const {
      query,
      employmentTypes = "",
      jobRequirements = "",
      jobTitles = "",
      companyTypes = "",
      employer = "",
      datePosted = "all",
      page = 1,
      numPages = 1,
      sort = "",
    } = params;

    // Use the filterEmploymentTypes function to process employmentTypes
    const filteredEmploymentTypes = filterEmploymentTypes(employmentTypes);

    const url = `https://jsearch.p.rapidapi.com/search?query=${query}&employment_types=${filteredEmploymentTypes}&job_requirements=${jobRequirements}&job_titles=${jobTitles}&company_types=${companyTypes}&employer=${employer}&date_posted=${datePosted}&page=${page}&num_pages=${numPages}`;

    const response = await fetch(url, options);
    const result = await response.json();

    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      if (sort) {
        return sortJobs(result.data, sort);
      } else {
        return result.data;
      }
    } else {
      console.error("No data received from API");
      return [];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Filters out 'ALL' from the employment types string.
const filterEmploymentTypes = (
  employmentTypes: string | null | undefined
): string => {
  if (!employmentTypes) return "";

  return employmentTypes
    .split(",")
    .filter((type) => type !== "ALL")
    .join(",");
};

// Sorts the jobs based on the sortType provided. Relevance checks the job_apply_quality_score and expires_at checks the job_offer_expiration_timestamp
const sortJobs = (data: Job[], sortType: string): Job[] => {
  const jobData = [...data];

  try {
    switch (sortType) {
      case "relevance":
        return jobData.sort(
          (a, b) =>
            (b.job_apply_quality_score ?? 0) - (a.job_apply_quality_score ?? 0)
        );
      case "expires_at":
        return jobData.sort(
          (a, b) =>
            (a.job_offer_expiration_timestamp ?? Number.MAX_SAFE_INTEGER) -
            (b.job_offer_expiration_timestamp ?? Number.MAX_SAFE_INTEGER)
        );
      default:
        return jobData;
    }
  } catch (error) {
    console.error(error);
    return jobData;
  }
};

export const getTotalPages = async (query: string): Promise<number> => {
  let totalResults = 0;
  let page = 1;
  const maxResultsPerRequest = 200; // 20 num_pages x 10 results per page
  const maxResultsPerPage = 10;
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
    query
  )}&page=${page}&num_pages=20`;

  try {
    while (true) {
      const response = await fetch(url, {
        ...options,
        next: { revalidate: 1 },
      });

      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return 0;
      }

      const responseData = await response.json();
      const results = responseData.data;

      totalResults += results.length;

      // If results are less than 200, it's the last set of results
      if (results.length < maxResultsPerRequest) {
        break;
      }

      page++;
    }

    return Math.ceil(totalResults / maxResultsPerPage);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCompaniesDetails = async (params: searchCompaniesParams) => {
  const { query } = params;
  const url = `https://jsearch.p.rapidapi.com/search-filters?query=${query}`;

  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 3600 },
    });
    const companies = await response.json();

    // get the first 3 companies
    const employers = companies.data?.employers.slice(0, 3);

    // for each company, get the name, value (company id)
    const employersObjs = employers?.map((company: Company) => ({
      id: company.value,
      name: company.name,
    }));

    // for each company, get the logo, city, country from searchJobs
    const companyDetails = await Promise.all(
      (employersObjs ?? []).map(async (company: Company) => {
        const response = await getSingleCompanyDetails({
          query,
          employer: company.id,
        });
        return {
          ...company,
          logo: response?.data[0]?.employer_logo,
          city: response?.data[0]?.job_city,
          country: response?.data[0]?.job_country,
          vacancies: response?.data.length,
        };
      })
    );

    return companyDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSingleCompanyDetails = async (
  params: getCompanyDetailsParams
) => {
  const { query, employer } = params;
  const url = `https://jsearch.p.rapidapi.com/search?query=${query}&employer=${employer}`;

  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 3600 },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEstimatedSalary = async ({
  jobTitle,
  location,
  radius,
}: searchEstimatedSalaries) => {
  try {
    const url = `https://jsearch.p.rapidapi.com/estimated-salary?job_title=${jobTitle}&location=${location}&{radius=${radius}}`;

    const response = await fetch(url, {
      ...options,
      next: { revalidate: 3600 },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchFilters = async (params: searchFiltersParams) => {
  const { query } = params;
  const url = `https://jsearch.p.rapidapi.com/search-filters?query=${query}`;

  try {
    const response = await fetch(url, { ...options, next: { revalidate: 10 } });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return [];
    }

    const responseData = await response.json();

    return responseData.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
