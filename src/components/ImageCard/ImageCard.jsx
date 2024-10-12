import css from './ImageCard.module.css';

const ImageCard = ({ smallImage, alt, onClick }) => {
  return (
    <div className={css.card} onClick={onClick}>
      <img src={smallImage} alt={alt} />
    </div>
  );
};

export default ImageCard;
