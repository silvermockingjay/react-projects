import type { Character } from '../interfaces/interfaces';

export async function getCharacter(id: number): Promise<Character> {
  const basicUrl = 'https://rickandmortyapi.com/api';
  const characterUrl = `${basicUrl}/character/${id}`;
  try {
    const response = await fetch(characterUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }
    const searchResults: Character = await response.json();
    return searchResults;
  } catch (error) {
    throw new Error(
      `No results found, try one more time. ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
