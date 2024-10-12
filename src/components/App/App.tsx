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

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<boolean>(true);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...res]);
        if (res.length < 10) {
          setTotalPages(false);
        }
      } catch (error: any) {
        setError(error.message);
        toast.error('Failed to fetch images.');
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setTotalPages(true);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (largeImageURL: string) => {
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
