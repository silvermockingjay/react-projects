import type { JSX } from 'react';
import { Card } from '../Card/Card';
import type { Character } from '../../services/interfaces/interfaces';
import styles from './CardList.module.css';

export interface CardListProps {
  cards: Character[];
  open: (e: React.MouseEvent<HTMLElement>) => void;
}

export function CardList({ cards, open }: CardListProps): JSX.Element {
  return (
    <div className={styles.cardList}>
      {cards.map((card) => (
        <Card key={card.id} openCardDetails={open} {...card} />
      ))}
    </div>
  );
}
