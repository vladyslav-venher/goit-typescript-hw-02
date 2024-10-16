import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

type ImageModalProps = {
  largeImage: string | null;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ largeImage, onClose }) => {
  return (
    <Modal
      isOpen={!!largeImage}
      onRequestClose={onClose}
      overlayClassName={css.overlay}
      className={css.modal}
      ariaHideApp={false}
    >
      <img
        src={largeImage || ''}
        alt="Large version"
        className={css.modalImage}
      />
    </Modal>
  );
};

export default ImageModal;
