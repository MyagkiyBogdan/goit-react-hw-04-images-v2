import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ src, alt, toggleModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
