import type { Form } from '../../app/features/formsSlice';
import userImg from '../../assets/user.png';
import styles from './Card.module.css';

interface CardProps {
  data: Form;
  isNewCard: boolean;
}

export function Card({ data, isNewCard }: CardProps) {
  return (
    <div className={`${styles.card} ${isNewCard ? styles.newCard : ''}`}>
      <div>
        <img
          className={styles.imageFile}
          src={data.picture || userImg}
          alt="Uploaded picture"
        />
      </div>
      <ul className={styles.contentList}>
        <li>Name: {data.name}</li>
        <li>Age: {data.age}</li>
        <li>Email: {data.email}</li>
        <li>Gender: {data.gender}</li>
        <li>Password: {data.password}</li>
        <li>T&C agreement: {data.acceptTerms ? 'yes' : 'no'}</li>
        <li>Country: {data.country}</li>
      </ul>
    </div>
  );
}
