import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { fetchImages } from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(true);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...res]);
        if (res.length < 10) {
          setTotalPages(false);
        }
      } catch (error) {
        setError(error.message);
        toast.error('Failed to fetch images.');
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setTotalPages(true);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = largeImageURL => {
    setSelectedImage(largeImageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearchSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {!totalPages && <b>END OF COLLECTION!!!</b>}
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {showModal && (
        <ImageModal largeImage={selectedImage} onClose={closeModal} />
      )}
      <Toaster />
    </div>
  );
}
