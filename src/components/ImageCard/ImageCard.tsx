import css from './ImageCard.module.css';

type ImageCardProps = {
  smallImage: string,
  alt: string,
  onClick: () => void,
};

const ImageCard: React.FC<ImageCardProps> = ({ smallImage, alt, onClick }) => {
  return (
    <div className={css.card} onClick={onClick}>
      <img src={smallImage} alt={alt} />
    </div>
  );
};

export default ImageCard;
