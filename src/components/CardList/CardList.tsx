import type { JSX } from 'react';
import { Card } from '../Card/Card';
import type { Character } from '../../services/interfaces/interfaces';
import styles from './CardList.module.css';

export interface CardListProps {
  cards: Character[];
}

export function CardList({ cards }: CardListProps): JSX.Element {
  return (
    <div className={styles.cardList}>
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}
