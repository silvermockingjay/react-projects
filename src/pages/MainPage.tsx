import { useState } from 'react';
import { Modal } from '../components/Modal/Modal';
import { RHFForm } from '../components/RHFForm/RHFForm';
import { UncontrolledForm } from '../components/UncontrolledForm/UncontrolledForm';
import styles from './MainPage.module.css';
import { useAppSelector } from '../app/hooks';
import { selectFormsData } from '../app/features/formsSlice';

export function MainPage() {
  const [formType, setFormType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const results = useAppSelector(selectFormsData);
  const handleClick = (type: string) => {
    setFormType(type);
    setOpenModal(true);
  };
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
        {results.length !== 0 && 'Results are here'}
      </section>
      {openModal && (
        <Modal onClick={() => setOpenModal(false)}>
          {formType === 'uncontrolledForm' && <UncontrolledForm />}
          {formType === 'RHFForm' && <RHFForm />}
        </Modal>
      )}
    </main>
  );
}
