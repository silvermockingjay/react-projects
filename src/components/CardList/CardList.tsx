import React from 'react';
import { Card } from '../Card/Card';
import type { Character } from '../../services/interfaces/interfaces';
import styles from './CardList.module.css';

export interface CardListProps {
  cards: Character[];
}

export class CardList extends React.Component<CardListProps> {
  render() {
    const { cards } = this.props;
    return (
      <div className={styles.cardList}>
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    );
  }
}
