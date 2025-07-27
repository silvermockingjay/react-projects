import type { JSX } from 'react';
import styles from './Card.module.css';
import type { Location } from '../../services/interfaces/interfaces';

export interface CardProps {
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Location;
  location: Location;
}

export function Card({
  image,
  name,
  status,
  species,
  gender,
  origin,
  location,
}: CardProps): JSX.Element {
  return (
    <div className={styles.itemCard}>
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
