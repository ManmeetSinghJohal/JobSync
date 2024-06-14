export interface searchJobParams {
  query: string | undefined;
  datePosted?: string | null | undefined;
  page?: string | null;
  numPages?: string | undefined;
  employmentTypes?: string | undefined | null;
  jobRequirements?: string | undefined | null;
  jobTitles?: string | undefined | null;
  companyTypes?: string | undefined | null;
  employer?: string | null | undefined;
  filters?: string | null | undefined;
  sort?: string | null;
}

export interface searchCompaniesParams {
  query: string | undefined;
  employer?: string | undefined;
}

export interface searchFiltersParams {
  query: string | undefined;
}

export interface getCompanyDetailsParams {
  query: string | undefined;
  employer: string | undefined;
}

export interface searchEstimatedSalaries {
  location: string | undefined;
  jobTitle: string | undefined;
  radius?: string | undefined;
}
