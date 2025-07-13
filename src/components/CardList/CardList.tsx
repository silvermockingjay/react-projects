import React from 'react';
import { Card } from '../Card/Card';
import type { SearchResults } from '../../services/interfaces/interfaces';

export class CardList extends React.Component<SearchResults> {
  render() {
    const cards = this.props.results;
    return (
      <div className="cards-list">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    );
  }
}
