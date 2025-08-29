import { useState } from 'react';
import { Modal } from '../components/Modal/Modal';
import { RHFForm } from '../components/RHFForm/RHFForm';
import { UncontrolledForm } from '../components/UncontrolledForm/UncontrolledForm';
import styles from './MainPage.module.css';
import { useAppSelector } from '../app/hooks';
import { selectFormsData } from '../app/features/formsSlice';
import { Card } from '../components/Card/Card';

export function MainPage() {
  const [formType, setFormType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const results = useAppSelector(selectFormsData);
  const handleClick = (type: string) => {
    setFormType(type);
    setOpenModal(true);
  };
  const closeForm = () => setOpenModal(false);
  return (
    <main>
      <section className={styles.formOptions}>
        <button
          className={styles.button}
          onClick={() => handleClick('uncontrolledForm')}
        >
          Uncontrolled Form
        </button>
        <button
          className={styles.button}
          onClick={() => handleClick('RHFForm')}
        >
          RHF Form
        </button>
      </section>
      <section className={styles.results}>
        {results.length !== 0 &&
          results.map((result, i) => (
            <Card
              key={result.email}
              data={result}
              customClass={i === results.length - 1 ? styles.newCard : ''}
            />
          ))}
      </section>
      {openModal && (
        <Modal onClick={() => setOpenModal(false)}>
          {formType === 'uncontrolledForm' && (
            <UncontrolledForm closeForm={closeForm} />
          )}
          {formType === 'RHFForm' && <RHFForm closeForm={closeForm} />}
        </Modal>
      )}
    </main>
  );
}
