import type { JSX } from 'react';
import styles from './Card.module.css';

export interface CardProps {
  id: number;
  image: string;
  name: string;
  openCardDetails: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Card({
  id,
  image,
  name,
  openCardDetails,
}: CardProps): JSX.Element {
  return (
    <div className={styles.itemCard} onClick={openCardDetails} data-id={id}>
      <div className={styles.itemContainer}>
        <img className={styles.itemImage} src={image} alt={name} />
      </div>
      <div className={styles.itemContent}>
        <h3 className={styles.itemTitle}>{name}</h3>
      </div>
    </div>
  );
}
