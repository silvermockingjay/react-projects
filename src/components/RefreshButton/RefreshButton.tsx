import { CustomButton } from '../CustomButton/CustomButton';
import styles from './RefreshButton.module.css';

type RefreshButtonProps = {
  onClick: () => void;
  text: string;
};

export const RefreshButton = ({ onClick, text }: RefreshButtonProps) => {
  return (
    <CustomButton customClass={styles.refresh} onClick={onClick} text={text} />
  );
};
