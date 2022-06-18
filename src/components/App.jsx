import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

import Button from './Button';
import Loader from './Loader';
import imagesAPI from '../services/pixabay-api';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [searchInfo, setSearchInfo] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchInfo === '') {
      return;
    }
    function fetchImages() {
      setStatus({ status: 'pending' });
      // pixibay-api import
      imagesAPI
        .fetchImages(searchInfo, page)
        .then(images => {
          setImages(prevImages => {
            return [...prevImages, ...images.hits];
          });
          setStatus('resolved');
          setTotalHits(images.totalHits);
        })
        .catch(error => {
          setStatus('rejected');
          setError(error);
        });
    }

    fetchImages();
    if (page > 1) {
      setTimeout(() => smoothScrolling(), 250);
    }
  }, [searchInfo, page]);

  // for SearcBar component
  const handleFormSubmit = newSearchInfo => {
    setSearchInfo(prevSearchInfo => {
      if (prevSearchInfo !== newSearchInfo) {
        setImages([]);
        setPage(1);
        setTotalHits(0);

        return newSearchInfo;
      }
      return newSearchInfo;
    });
  };

  // for Button component
  const handleIncreasePage = () => setPage(prevPage => prevPage + 1);

  const smoothScrolling = () => {
    const { height: cardHeight } = document
      .querySelector('#root')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 0.425,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'idle' && (
        <p className={styles.text}> Hello! What you want to find?</p>
      )}
      {status === 'rejected' && <p className={styles.text}>{error.message}</p>}

      {status === 'resolved' && images.length === 0 && (
        <p className={styles.text}>No images on {searchInfo} topic</p>
      )}
      {images.length > 0 && <ImageGallery images={images} />}
      {totalHits > images.length && status !== 'pending' && (
        <Button onClick={handleIncreasePage} />
      )}
      {status === 'pending' && <Loader />}

      <ToastContainer autoClose={2500} />
    </div>
  );
};
