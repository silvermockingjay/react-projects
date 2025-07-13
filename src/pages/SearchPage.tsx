import React from 'react';
import { Main } from '../components/Main/Main';
import { Section } from '../components/Section/Section';
import { SearchForm } from '../components/SearchForm/SearchForm';
import { CardList } from '../components/CardList/CardList';
import { getCharacters } from '../services/APIRequests/getCharacters';
import type { Character } from '../services/interfaces/interfaces';

interface State {
  query: string;
  results: Character[];
}

export class SearchPage extends React.Component {
  state: State = {
    query: '',
    results: [],
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
    const data = await getCharacters(query);
    this.setState({ results: data.results });
  };

  render() {
    return (
      <Main>
        <Section>
          <SearchForm
            onChange={this.handleInput}
            onSubmit={this.handleSearch}
            value={this.state.query}
          />
        </Section>
        <Section>
          <CardList cards={this.state.results} />
        </Section>
      </Main>
    );
  }
}
