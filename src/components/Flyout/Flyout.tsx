import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { allCleared, selectCount } from '../../features/cards/cardsSlice';
import { CustomButton } from '../CustomButton/CustomButton';
import styles from './Flyout.module.css';

export function Flyout() {
  const dispatch = useAppDispatch();
  const selectedCardsCount = useAppSelector(selectCount);
  const unselectAll = (): void => {
    dispatch(allCleared());
  };
  const flyoutClass = selectedCardsCount ? styles.flyout : styles.hide;
  return (
    <div className={flyoutClass} data-testid="flyout">
      <div className={styles.items}>{selectedCardsCount} items</div>
      <div className={styles.actions}>
        <CustomButton
          text="Unselect All"
          customClass={styles.unselectBtn}
          onClick={unselectAll}
        />
        <CustomButton text="Download" customClass={styles.downloadBtn} />
      </div>
    </div>
  );
}
