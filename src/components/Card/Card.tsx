'use client';

import type { JSX } from 'react';
import styles from './Card.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  cardToggled,
  selectCheckedCards,
  type Card,
} from '../../features/cards/cardsSlice';
import { CustomInput } from '../CustomInput/CustomInput';

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
  const dispatch = useAppDispatch();
  const selectedCards = useAppSelector(selectCheckedCards);
  const isChecked = selectedCards.some((card) => card.id === id);
  const card: Card = {
    id: id,
    image: image,
    name: name,
  };
  const onChangeToggle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(cardToggled(card));
  };

  return (
    <div
      className={styles.itemCard}
      onClick={openCardDetails}
      data-id={id}
      role="region"
      aria-label="character card"
    >
      <div className={styles.itemContainer}>
        <CustomInput
          type="checkbox"
          isChecked={isChecked}
          onChange={onChangeToggle}
          customClass={styles.checkbox}
        />
        <img className={styles.itemImage} src={image} alt={name} />
      </div>
      <div className={styles.itemContent}>
        <h3 className={styles.itemTitle}>{name}</h3>
      </div>
    </div>
  );
}
