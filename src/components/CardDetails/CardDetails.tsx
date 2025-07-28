import type { JSX } from 'react';
import type { Location } from '../../services/interfaces/interfaces';
import styles from '../Card/Card.module.css';

export interface CardDetailsProps {
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Location;
  location: Location;
}

export function CardDetails({
  name,
  status,
  species,
  gender,
  origin,
  location,
}: CardDetailsProps): JSX.Element {
  return (
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
  );
}
