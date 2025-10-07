import type { JSX } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';
import styles from './PaginationControls.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}
export function PaginationControls({
  nextPage,
  prevPage,
  page,
  totalPages,
}: PaginationProps): JSX.Element {
  return (
    <div className={styles.paginationControls}>
      <CustomButton
        type="button"
        text="Prev"
        style="secondary"
        onClick={prevPage}
        isDisabled={page === 1}
      />
      <div>
        Showing {page} out of {totalPages}
      </div>
      <CustomButton
        type="button"
        text="Next"
        style="secondary"
        onClick={nextPage}
        isDisabled={page === totalPages}
      />
    </div>
  );
}
