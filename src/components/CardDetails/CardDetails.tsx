import type { JSX } from 'react';
import type { Character } from '../../services/interfaces/interfaces';
import styles from '../Card/Card.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getCharacter } from '../../services/APIRequests/getCharacter';
import { Loader } from '../Loader/Loader';
import { Fallback } from '../FallBack/Fallback';
import { CustomButton } from '../CustomButton/CustomButton';

export function CardDetails(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<Character | null>(null);
  const params = useParams();
  const id = Number(params.details) || 1;
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async (): Promise<void> => {
      setLoading(true);
      try {
        const results = await getCharacter(id);
        setDetails(results);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setLoading(false);
        } else {
          setError('Unknown error occurred');
          setLoading(false);
        }
      }
    };
    getDetails();
  }, [id, setDetails]);

  const closeDetails = () => {
    navigate('/');
  };

  let content: React.ReactNode;
  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <Fallback text={error} />;
  } else {
    content = (
      <>
        <h3 className={styles.itemTitle}>{details?.name}</h3>
        <div className={styles.itemContent}>
          <ul>
            <li>
              <b>Status: </b> {details?.status}
            </li>
            <li>
              <b>Species: </b> {details?.species}
            </li>
            <li>
              <b>Gender: </b> {details?.gender}
            </li>
            <li>
              <b>Origin: </b> {details?.origin.name}
            </li>
            <li>
              <b>Location: </b> {details?.location.name}
            </li>
          </ul>
        </div>
      </>
    );
  }

  return (
    <div>
      <CustomButton
        type="button"
        text="X"
        customClass="closeBtn"
        onClick={closeDetails}
      />
      {content}
    </div>
  );
}
