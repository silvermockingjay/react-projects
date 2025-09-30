import type { SearchResults } from '../interfaces/interfaces';

export async function getCharacters(
  query: string,
  page: number = 1,
  signal?: AbortSignal
): Promise<SearchResults> {
  const basicUrl = 'https://rickandmortyapi.com/api';
  const characterUrl =
    query !== ''
      ? `${basicUrl}/character/?page=${page}&name=${query}`
      : `${basicUrl}/character/?page=${page}`;
  try {
    const response = await fetch(characterUrl, { signal });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const searchResults: SearchResults = await response.json();
    return searchResults;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }
    throw new Error(
      `No results found, try one more time. ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
