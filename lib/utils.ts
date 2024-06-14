import { tagKeywords, customOrder } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { SearchFilterData } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HourlyRate {
  min: number;
  max: number;
  median: number;
}

export function calculateHourlyRate(
  minSalary: number | null,
  maxSalary: number | null
): HourlyRate {
  if (minSalary === null || maxSalary === null) {
    return {
      min: 0,
      max: 0,
      median: 0,
    };
  }

  const hoursPerYear = 2080; // 40 hours/week * 52 weeks/year

  const minHourlyRate = minSalary / hoursPerYear;
  const maxHourlyRate = maxSalary / hoursPerYear;
  const medianSalary = (minSalary + maxSalary) / 2;
  const medianHourlyRate = medianSalary / hoursPerYear;

  return {
    min: parseFloat(minHourlyRate.toFixed(0)),
    max: parseFloat(maxHourlyRate.toFixed(0)),
    median: parseFloat(medianHourlyRate.toFixed(0)),
  };
}

export function formatEmploymentType(employmentType: string): string {
  switch (employmentType) {
    case "FULLTIME":
      return "Full-time";
    case "PARTTIME":
      return "Part-time";
    case "CONTRACTOR":
      return "Contract";
    default:
      return formatString(employmentType);
  }
}

export function formatString(input: string | null | undefined): string {
  if (input === null || input === undefined) {
    return "";
  }

  const formatted = input.toLowerCase();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatJobTitle(title: string): string {
  // Check for falsy values or if title includes 'undefined' (case-insensitive)
  if (!title || /undefined/i.test(title)) {
    return "Job Title n/a";
  }

  // Remove part in '()'
  title = title?.replace(/\(.*?\)/g, "");

  // Trim whitespaces
  title = title?.trim();

  // Capitalize each word
  title = title?.replace(/\b\w/g, (char) => char.toUpperCase());

  // Convert Junior to Jr. and Senior to Sr.
  title = title?.replace("Junior", "Jr.").replace("Senior", "Sr.");

  return title;
}

// Format the job location from jobCity and jobState.
export function formatJobLocation(
  jobCity: string | null | undefined,
  jobState: string | null | undefined
): string {
  const formattedCity = jobCity ? formatString(jobCity) : null;
  const formattedState = jobState ? formatString(jobState) : null;

  return [formattedCity, formattedState].filter(Boolean).join(", ");
}

export const getDurationLeft = (
  jobExpirationDate: string | null
): string | null => {
  if (jobExpirationDate === null) {
    return null;
  }

  const now = new Date();
  const expirationDate = new Date(jobExpirationDate);

  // Calculate the time difference in seconds
  const timeDifferenceInSeconds = Math.floor(
    (expirationDate.getTime() - now.getTime()) / 1000
  );

  if (timeDifferenceInSeconds < 0) {
    return "Expired";
  }

  // Calculate the time difference in days
  const timeDifferenceInDays = Math.floor(timeDifferenceInSeconds / 86400);

  if (timeDifferenceInDays === 0) {
    return "Expires today";
  } else if (timeDifferenceInDays === 1) {
    return "1 day left";
  } else {
    return `${timeDifferenceInDays} days left`;
  }
};

export const formatNumberWithExtension = (number: number): string => {
  if (number >= 1e6) return `${(number / 1e6).toFixed(0)}M`;
  if (number >= 1e3) return `${(number / 1e3).toFixed(0)}K`;
  return number ? number.toString() : "";
};

interface JobSalaryData {
  minSalary: number | null;
  maxSalary: number | null;
  currency: string | null;
  period: string | null;
}

export const monthlySalaryRange = (
  salaryData: JobSalaryData
): string | null => {
  let { minSalary, maxSalary, currency, period } = salaryData;

  if (minSalary === null || maxSalary === null || currency === null) {
    return null;
  }

  // Convert yearly salary to monthly
  if (period === "YEAR") {
    minSalary /= 12;
    maxSalary /= 12;
  }

  // Format salary to k (thousands)
  minSalary = Math.round(minSalary / 1000);
  maxSalary = Math.round(maxSalary / 1000);

  // Determine currency symbol
  const currencySymbol = currency === "EUR" ? "€" : "$";

  return `${currencySymbol}${minSalary}-${maxSalary}k`;
};

export const getTimestamp = (createdAt: string): string => {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDifference = now.getTime() - createdAtDate.getTime();

  // Define time units in milliseconds
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30.44 * day; // Approximate average number of days in a month
  const year = 365.25 * day; // Approximate average number of days in a year

  if (timeDifference < second) {
    return `just now`;
  } else if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / second);
    return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};

// Function to format quality score number to percentage.
export const formatQualityScore = (qualityScore: number): string =>
  `${(qualityScore * 100).toFixed(0)}%`;

// Function to extract keywords for generating tags. It checks three possible keys of the JSearch API (job_required_skills, job_highlights.Qualifications, and job_description) and scans them based on a list of keywords found in /constants/index.ts.
export function extractKeywords(
  skills: string[] | null,
  qualifications: string[] | null,
  description: string | null
): string[] {
  const skillKeywords = skills
    ? skills.map((skill) => extractFromText(tagKeywords, skill)).flat()
    : [];
  const qualificationKeywords = qualifications
    ? qualifications
        .map((qualification) => extractFromText(tagKeywords, qualification))
        .flat()
    : [];
  const descriptionKeywords = description
    ? extractFromText(tagKeywords, description)
    : [];

  return Array.from(
    new Set([
      ...skillKeywords,
      ...qualificationKeywords,
      ...descriptionKeywords,
    ])
  );
}

const extractFromText = (
  keyWordList: { name: string; upper: boolean }[],
  text: string
): string[] => {
  return text
    ? keyWordList
        .filter(({ name }) => text.toLowerCase().includes(name.toLowerCase()))
        .map(({ name, upper }) =>
          upper ? name.toUpperCase() : capitalize(name)
        )
    : [];
};

const capitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

export const formatFilterTitle = (key: string): string => {
  const newKey = key
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
  return newKey;
};

export const formatFilterKey = (key: string): string => {
  return key
    .split("_")
    .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word)))
    .join("");
};

export const formatSortKey = (key: string): string => {
  return key
    .split("_")
    .map((word, index) => (index === 0 ? capitalize(word) : word))
    .join(" ");
};

export function removeCommasAndHyphens(s: string) {
  const cleanedString = s.replace(/[^\w\s]/g, "");

  // Split the cleaned string into an array of words
  const words = cleanedString.split(/\s+/);

  // Take the first two words
  const firstTwoWords = words.slice(0, 2).join(" ");

  return firstTwoWords;
}
export const convertSalariesToYearlyBase = (data: any) => {
  const commonBase = "YEAR";

  const conversionRates = {
    HOUR: 2080,
    MONTH: 12,
    WEEK: 52,
    YEAR: 1,
  };

  const convertedData = data.map((item: any) => {
    if (item.salary_period !== commonBase) {
      if (item.salary_period === "HOUR") {
        const minYearlySalary = item.min_salary * conversionRates.HOUR;
        const maxYearlySalary = item.max_salary * conversionRates.HOUR;
        const medianYearlySalary = item.median_salary * conversionRates.HOUR;
        return {
          ...item,
          minYearlySalary,
          maxYearlySalary,
          medianYearlySalary,
        };
      } else if (item.salary_period === "MONTH") {
        const minYearlySalary = item.min_salary * conversionRates.MONTH;
        const maxYearlySalary = item.max_salary * conversionRates.MONTH;
        const medianYearlySalary = item.median_salary * conversionRates.MONTH;
        return {
          ...item,
          minYearlySalary,
          maxYearlySalary,
          medianYearlySalary,
        };
      } else if (item.salary_period === "WEEK") {
        const minYearlySalary = item.min_salary * conversionRates.WEEK;
        const maxYearlySalary = item.max_salary * conversionRates.WEEK;
        const medianYearlySalary = item.median_salary * conversionRates.WEEK;
        return {
          ...item,
          minYearlySalary,
          maxYearlySalary,
          medianYearlySalary,
        };
      }
    } else {
      const minYearlySalary = item.min_salary;
      const maxYearlySalary = item.max_salary;
      const medianYearlySalary = item.median_salary;

      return { ...item, minYearlySalary, maxYearlySalary, medianYearlySalary };
    }
    return item;
  });
  return convertedData;
};

interface UrlQueryParams {
  params: string;
  items: Map<string, string>;
}

export const formUrlQuery = ({ params, items }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  for (const [key, value] of items) {
    currentUrl[key] = value;
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

// Function to calculate the page range to display in the pagination component. It only shows 5 pages at a time.
export const calculatePageRange = (
  currentPage: number,
  totalPages: number
): number[] => {
  const maxDisplayPages = 5;
  let startPage: number, endPage: number;

  if (totalPages <= maxDisplayPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const pagesBeforeCurrentPage = Math.floor(maxDisplayPages / 2);
    const pagesAfterCurrentPage = Math.ceil(maxDisplayPages / 2) - 1;

    if (currentPage <= pagesBeforeCurrentPage) {
      // Current page near the start
      startPage = 1;
      endPage = maxDisplayPages;
    } else if (currentPage + pagesAfterCurrentPage >= totalPages) {
      // Current page near the end
      startPage = totalPages - maxDisplayPages + 1;
      endPage = totalPages;
    } else {
      // Current page somewhere in the middle
      startPage = currentPage - pagesBeforeCurrentPage;
      endPage = currentPage + pagesAfterCurrentPage;
    }
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
};

export const location = (city: string, state: string, country: string) => {
  const locationElements = [city, state, country];
  return locationElements.filter((element) => !!element).join(", ");
};

export const modifyString = (originalString: string) => {
  return originalString.replace(/\s/g, "").toLowerCase();
};

export const getRandomInt = (min: number, max: number) => {
  const random = ~~(Math.random() * (max - min + 1)) + min;

  return random;
};

// Function to get the sort order index
const getSortOrder = (key: string) => {
  const index = customOrder.indexOf(key);
  return index === -1 ? customOrder.length : index;
};

// Function to sort the filter keys based on the custom order found in /constants/index.ts
export const sortKeys = (filterData: SearchFilterData) => {
  return Object.keys(filterData).sort((a, b) => {
    return getSortOrder(a) - getSortOrder(b);
  });
};
