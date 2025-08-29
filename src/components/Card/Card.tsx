import type { Form } from '../../app/features/formsSlice';
import styles from './Card.module.css';

interface CardProps {
  data: Form;
  isNewCard: boolean;
}

export function Card({ data, isNewCard }: CardProps) {
  return (
    <div className={`${styles.card} ${isNewCard ? styles.newCard : ''}`}>
      <ul className={styles.contentList}>
        <li>Name: {data.name}</li>
        <li>Age: {data.age}</li>
        <li>Email: {data.email}</li>
        <li>Gender: {data.gender}</li>
        <li>Password: {data.password}</li>
        <li>T&C agreement: {data.age ? 'yes' : 'no'}</li>
        <li>Country: {data.age}</li>
        <li className={styles.imageContainer}>
          <img src={data.picture} alt="Uploaded picture" />
        </li>
      </ul>
    </div>
  );
}
