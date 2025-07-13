import React from 'react';
import { Card } from '../Card/Card';
import type { Character } from '../../services/interfaces/interfaces';

interface CardListProps {
  cards: Character[];
}

export class CardList extends React.Component<CardListProps> {
  render() {
    const { cards } = this.props;
    return (
      <div className="cards-list">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    );
  }
}
