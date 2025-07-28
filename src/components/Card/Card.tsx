import type { JSX } from 'react';
import styles from './Card.module.css';
import type { Location } from '../../services/interfaces/interfaces';

export interface CardProps {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Location;
  location: Location;
  openCardDetails: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Card({
  id,
  image,
  name,
  status,
  species,
  gender,
  origin,
  location,
  openCardDetails,
}: CardProps): JSX.Element {
  return (
    <div className={styles.itemCard} onClick={openCardDetails} data-id={id}>
      <div className={styles.itemContainer}>
        <img className={styles.itemImage} src={image} alt={name} />
      </div>
      <div>
        <h3 className={styles.itemTitle}>{name}</h3>
        <div className={styles.itemContent}>
          <ul>
            <li>
              <b>Status: </b> {status}
            </li>
            <li>
              <b>Species: </b> {species}
            </li>
            <li>
              <b>Gender: </b> {gender}
            </li>
            <li>
              <b>Origin: </b> {origin.name}
            </li>
            <li>
              <b>Location: </b> {location.name}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
