import type { SearchResults } from '../interfaces/interfaces';

export async function getCharacters(query: string): Promise<SearchResults> {
  const basicUrl = 'https://rickandmortyapi.com/api';
  const characterUrl = `${basicUrl}/character/?name=${query.trim()}`;
  try {
    const response = await fetch(characterUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const searchResults: SearchResults = await response.json();
    return searchResults;
  } catch (error) {
    throw new Error(
      `Couldn't get characters data. Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
