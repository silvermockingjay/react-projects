import type { SearchResults } from '../interfaces/interfaces';

export async function getCharacters(query: string): Promise<SearchResults> {
  const basicUrl = 'https://rickandmortyapi.com/api';
  const characterUrl =
    query !== ''
      ? `${basicUrl}/character/?name=${query}`
      : `${basicUrl}/character/?page=1`;
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
      `No results found, try one more time. ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
