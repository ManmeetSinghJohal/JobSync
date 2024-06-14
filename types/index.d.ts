export interface CompanyCardProps {
  name: string;
  logo: string;
  city: string;
  state: string;
  country: string;
  vacancies: number;
  id: string;
}

export interface CompanyCardCompanyLogoProps {
  className?: string;
  width: number;
  height: number;
  alt: string;
  src: string | null;
  fallbackSrc: string;
}

export interface InlineJobCardProps {
  employerName: string;
  employerLogo: string | null;
  jobTitle: string;
  jobEmploymentType: string;
  jobCity: string;
  jobState: string;
  jobMinSalary: number | null;
  jobMaxSalary: number | null;
  jobCountry: string;
  jobQualityScore: number;
}

export interface InlineJobCardCompanyLogoProps {
  className?: string;
  width: number;
  height: number;
  alt: string;
  src: string | null;
  fallbackSrc: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  city: string;
  state: string;
  country: string;
  value: string;
  vacancies: number;
}

export interface Job {
  job_id: string;
  employer_name: string;
  employer_logo: string;
  job_title: string;
  job_city: string;
  job_state: string;
  job_highlights: {
    Qualifications: string[];
  };
  job_description: string;
  job_employment_type: string;
  job_apply_quality_score: number;
  job_required_skills: string[] | null;
  job_posted_at_timestamp: number | null;
  job_posted_at_datetime_utc: string;
  job_offer_expiration_datetime_utc: string;
  job_offer_expiration_timestamp: number | null;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_country: string;
  job_salary_currency: string | null;
  job_salary_period: string | null;
  job_apply_link: string;
  job_posted_at: string;
  job_expires_at: string;
  job_required_skills: string[] | null;
  job_qualifications: string[];
  job_publisher: string;
  employer_company_type: string;
  employer_website: string;
  job_onet_soc: number;
}

export interface JobCardProps {
  jobId: string;
  employerLogo: string;
  jobTitle: string;
  jobDescription: string;
  jobEmploymentType: string;
  jobPostedAt: string;
  jobExpiresAt: string;
  jobRequiredSkills: string[] | null;
  jobQualifications: string[];
  jobMinSalary: number | null;
  jobMaxSalary: number | null;
}

export interface JobCardCompanyLogoProps {
  className?: string;
  width: number;
  height: number;
  alt: string;
  src: string | null;
  fallbackSrc: string;
}

export interface CompanyLogoProps {
  className?: string;
  width: number;
  height: number;
  alt: string;
  src: string | null;
  fallbackSrc: string;
}

export interface MetricProps {
  contract: string;
  jobPostedAt: string;
  jobExpiration: string;
}

export interface TagProps {
  tags: string[];
  extraStyles?: string;
  largeCard?: boolean;
}

export interface SalaryProps {
  minSalary: number | null;
  maxSalary: number | null;
  currency: string | null;
  period: string | null;
  buttonName: string;
}

export interface RecommendedJobsProps {
  query: string;
}
export interface FeaturedCompaniesProps {
  query: string;
}

export interface AboutCompanyProps {
  employerName: string;
  employerLogo: string;
  jobDescription: string;
}

export interface RequProps {
  jobExperience: number;
  jobTitle: string;
  minSalary: number | null;
  employmentType: string;
}

export interface SearchParamsProps {
  searchParams: {
    query: string;
    location?: string | null;
    employmentTypes?: string | null;
    jobRequirements?: string | null;
    datePosted?: string | null;
    jobTitles?: string | null;
    companyTypes?: string | null;
    employer?: string | null;
    page?: string | null;
    sort?: string | null;
  };
}

interface Category {
  // not available
}

interface JobTitle {
  name: string;
  value: string;
  est_count: number;
}

interface CompanyType {
  name: string;
  value: string;
  est_count: number;
}

interface Employer {
  name: string;
  value: string;
  est_count: number;
}

interface DatePosted {
  name: string;
  value: string;
  est_count: number;
}

interface EmploymentType {
  name: string;
  value: string;
  est_count: number;
}

interface JobRequirement {
  name: string;
  value: string;
  est_count: number;
}

export interface SearchFilterData {
  categories: Category[];
  job_titles: JobTitle[];
  company_types: CompanyType[];
  employers: Employer[];
  date_posted: DatePosted[];
  employment_types: EmploymentType[];
  job_requirements: JobRequirement[];
}

export interface SearchFilterProps {
  data: SearchFilterData;
}
