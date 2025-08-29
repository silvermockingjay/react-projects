import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import type React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function Modal({ children, onClick }: ModalProps) {
  return createPortal(
    <div className={styles.modal}>
      <button className={styles.closeBtn} onClick={onClick}>
        X
      </button>
      <div className={styles.modalBody}>{children}</div>
    </div>,
    document.body
  );
}
