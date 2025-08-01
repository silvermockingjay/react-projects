import type { JSX } from 'react';
import type { Character } from '../../services/interfaces/interfaces';
import styles from './CardDetails.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { getCharacter } from '../../services/APIRequests/getCharacter';
import { Loader } from '../Loader/Loader';
import { Fallback } from '../FallBack/Fallback';
import { CustomButton } from '../CustomButton/CustomButton';

export function CardDetails(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<Character | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async (): Promise<void> => {
      setLoading(true);
      const id = Number(searchParams.get('detailsId')) || 1;
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
  }, [searchParams]);

  const closeDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('detailsId');
    navigate(`/?${newSearchParams.toString()}`);
  };

  let content: React.ReactNode;
  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <Fallback text={error} />;
  } else {
    content = (
      <div className={styles.itemCard} role="region" aria-label="card details">
        <div className={styles.itemContainer}>
          <CustomButton
            type="button"
            text="X"
            customClass={styles.closeBtn}
            onClick={closeDetails}
          />
          <img
            className={styles.itemImage}
            src={details?.image}
            alt={details?.name}
          />
        </div>
        <div>
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
        </div>
      </div>
    );
  }

  return content;
}
