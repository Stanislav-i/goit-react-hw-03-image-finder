import css from './imageGalleryItem.module.css';
export const ImageGalleryItem = ({
  pictureUrl,
  openModal,
  modalPictureUrl,
}) => {
  return (
    <li
      onClick={() => openModal(modalPictureUrl)}
      className={css.ImageGalleryItem}
    >
      <img src={pictureUrl} alt=" " width="100px" className={css.itemImage} />
    </li>
  );
};
