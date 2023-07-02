import css from './imageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ data, openModal }) => {
  // console.log(data);
  return (
    <>
      {data.length === 0 ? (
        alert('No images!')
      ) : (
        <ul className={css.imageGallery}>
          {data.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              pictureUrl={webformatURL}
              openModal={openModal}
              modalPictureUrl={largeImageURL}
            />
          ))}
        </ul>
      )}
    </>
  );
};
