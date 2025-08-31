import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.css';
import optionalFields from '../../utils/optionalColumns';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  optionalCol: string[];
  setOptionalCol: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Modal({
  isOpen,
  onClose,
  optionalCol,
  setOptionalCol,
}: ModalProps) {
  const [selectedFields, setSelectedFields] = useState(optionalCol);
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
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const toggleField = (field: string) => {
    setSelectedFields((prev) => {
      if (prev.includes(field)) {
        return prev.filter((currField) => currField !== field);
      } else {
        return [...prev, field];
      }
    });
  };

  const applyChanges = () => {
    setOptionalCol(selectedFields);
    onClose();
  };

  return createPortal(
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
    >
      <button className={styles.closeBtn} onClick={onClose} aria-label="close">
        X
      </button>
      <div className={styles.modalBody}>
        <h2>Select optional fields</h2>
        {optionalFields.map((field) => (
          <label key={field}>
            <input
              type="checkbox"
              checked={selectedFields.includes(field)}
              onChange={() => toggleField(field)}
            />
            {field}
          </label>
        ))}
        <button onClick={applyChanges}>Apply changes</button>
      </div>
    </div>,
    document.body
  );
}
