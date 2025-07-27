import { useEffect, useState } from 'react';
import { CustomMain } from '../components/CustomMain/CustomMain';
import { CustomSection } from '../components/CustomSection/CustomSection';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { CardList } from '../components/CardList/CardList';
import { getCharacters } from '../services/APIRequests/getCharacters';
import type { Character } from '../services/interfaces/interfaces';
import { Loader } from '../components/Loader/Loader';
import { Fallback } from '../components/FallBack/Fallback';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async (): Promise<void> => {
      const character = localStorage.getItem('query') || '';
      setQuery(character);
      await handleSearch(character);
    };

    fetchCards();
  }, []);

  const handleSearch = async (query: string): Promise<void> => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await getCharacters(query);
      setResults(data.results);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setFetchError(error.message);
        setLoading(false);
      } else {
        setFetchError('Unknown error occurred');
        setLoading(false);
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const character = query.trim();
    localStorage.setItem('query', character);
    await handleSearch(character);
  };

  let content: React.ReactNode;
  if (loading) {
    content = <Loader />;
  } else if (fetchError) {
    content = <Fallback text={fetchError} />;
  } else if (results?.length === 0) {
    content = <Fallback text="No results found, try another character" />;
  } else if (results) {
    content = <CardList cards={results} />;
  }

  return (
    <CustomMain>
      <CustomSection>
        <SearchForm
          onChange={handleInput}
          onSubmit={handleSubmit}
          value={query}
        />
      </CustomSection>
      <CustomSection>{content}</CustomSection>
    </CustomMain>
  );
}
