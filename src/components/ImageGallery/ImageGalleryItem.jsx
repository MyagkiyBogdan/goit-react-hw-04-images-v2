import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { useState } from 'react';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const toggleModal = (src, alt) => {
    setShowModal(prevState => !prevState);
    setModalSrc(src);
    setModalAlt(alt);
  };

  return (
    <>
      <li className={styles.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={styles.ImageGalleryItemImage}
          onClick={() => toggleModal(largeImageURL, tags)}
        />
      </li>
      {showModal && (
        <Modal src={modalSrc} alt={modalAlt} toggleModal={toggleModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
