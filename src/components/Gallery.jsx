import React, { useContext } from 'react';
import { PhotosContext } from '../context/MyContext';
import IconHeart from './IconHeart';

const GalleryItem = ({ photo, onToggleLike }) => {
  return (

    <div className="gallery-item" style={{ position: 'relative' }}>
      <img src={photo.src.large} alt={photo.alt} className="gallery-image" style={{ width: '100%', display: 'block' }} />
      <button className="heart-button" onClick={() => onToggleLike(photo.id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none' }}>
        <IconHeart filled={photo.liked} />
      </button>
      <div className="photo-description" style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white' }}>
        <p>{photo.photographer}</p>
      </div>
    </div>
  );
};

const Gallery = () => {
  const { photos, toggleLike } = useContext(PhotosContext); 

  return (
    <div className="gallery p-3">
      {photos.map((photo) => (
        <GalleryItem key={photo.id} photo={photo} onToggleLike={toggleLike} />
      ))}
    </div>
  );
};

export default Gallery;