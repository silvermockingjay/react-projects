import React from 'react';
import { Main } from '../components/Main/Main';
import { Section } from '../components/Section/Section';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { CardList } from '../components/CardList/CardList';
import { getCharacters } from '../services/APIRequests/getCharacters';
import type { Character } from '../services/interfaces/interfaces';
import { Loader } from '../components/Loader/Loader';
import { FallBack } from '../components/FallBack/FallBack';

interface State {
  query: string;
  results: Character[];
  loading: boolean;
  fetchError: string | null;
  hasError: boolean;
}

export class SearchPage extends React.Component {
  state: State = {
    query: '',
    results: [],
    loading: false,
    fetchError: null,
    hasError: false,
  };

  componentDidMount(): void {
    const query = localStorage.getItem('query') || '';
    this.setState({ query: query });
  }

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    localStorage.setItem('query', this.state.query.trim());
    await this.handleSearch();
  };

  handleSearch = async (): Promise<void> => {
    const query = localStorage.getItem('query') || '';
    this.setState({ loading: true, error: null });
    try {
      const data = await getCharacters(query);
      this.setState({ results: data.results, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      } else {
        this.setState({ error: 'Unknown error occurred', loading: false });
      }
    }
  };

  render() {
    let content: React.ReactNode;
    if (this.state.loading) {
      content = <Loader />;
    } else if (this.state.fetchError) {
      content = <FallBack text={this.state.fetchError} />;
    } else if (this.state.results.length === 0) {
      content = <FallBack text="No results found, try another character" />;
    } else {
      content = <CardList cards={this.state.results} />;
    }
    return (
      <Main>
        <Section>
          <SearchForm
            onChange={this.handleInput}
            onSubmit={this.handleSearch}
            value={this.state.query}
          />
        </Section>
        <Section>{content}</Section>
      </Main>
    );
  }
}
