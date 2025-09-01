export type CountriesData = Record<string, CountryData>;

export interface CountryData {
  iso_code: string;
  data: YearData[];
}

export interface YearData {
  year: number;
  [key: string]: number;
}
