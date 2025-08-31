import { createPortal } from 'react-dom';
import type React from 'react';
import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

export function Modal({ children, isOpen, onClick }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      const modal = modalRef.current;
      if (modal) modal.focus();
      return () => {
        const activeElem = document.activeElement;
        if (
          modal &&
          activeElem instanceof HTMLElement &&
          modal.contains(activeElem)
        ) {
          activeElem?.blur();
        }
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClick();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClick]);

  return createPortal(
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
    >
      <button className={styles.closeBtn} onClick={onClick} aria-label="close">
        X
      </button>
      <div className={styles.modalBody}>{children}</div>
    </div>,
    document.body
  );
}
