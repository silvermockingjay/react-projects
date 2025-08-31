import type { CountriesData } from '../interfaces/interfaces';

export async function getData(): Promise<CountriesData> {
  try {
    const response = await fetch('/owid-co2-data.json');
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const countriesData: CountriesData = await response.json();
    return countriesData;
  } catch (error) {
    throw new Error(
      `No results found, try one more time. ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
