import type { JSX } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';

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
  const prevPageClass = page === 1 ? 'controlBtn inactive' : 'controlBtn';
  const nextPageClass =
    page === totalPages ? 'controlBtn inactive' : 'controlBtn';
  return (
    <div className="paginationControls">
      <CustomButton
        type="button"
        text="Prev"
        customClass={prevPageClass}
        onClick={prevPage}
      />
      <div>
        Showing {page} out of {totalPages}
      </div>
      <CustomButton
        type="button"
        text="Next"
        customClass={nextPageClass}
        onClick={nextPage}
      />
    </div>
  );
}
