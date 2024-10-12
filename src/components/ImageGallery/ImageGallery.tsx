import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
};

type ImageGalleryProps = {
  images: Image[];
  onImageClick: (url: string) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={css.list}>
      {images.map(image => (
        <li key={image.id} className={css.card}>
          <ImageCard
            smallImage={image.urls.small}
            alt={image.alt_description}
            onClick={() => onImageClick(image.urls.regular)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
