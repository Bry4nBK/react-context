import React, { useContext, useState, useMemo } from 'react';
import { PhotosContext } from '../context/MyContext';


import IconHeart from '../components/IconHeart';

const Favorites = () => {
  const { photos, toggleLike } = useContext(PhotosContext);
  const [notes, setNotes] = useState({});

  const handleNoteChange = (id, event) => {
    setNotes(prevNotes => ({ ...prevNotes, [id]: event.target.value }));
  };

  const favoritePhotos = useMemo(
    () => photos.filter(photo => photo.liked),
    [photos]
  );

  return (
    <div className="Title">
      <h1>Fotos Favoritas</h1>
      <div className="gallery grid-columns-5 p-3">
        {favoritePhotos.map((photo) => (
          <div
            key={photo.id}
            className="gallery-item"
            onDoubleClick={() => toggleLike(photo.id)}
          >
            <img
              src={photo.src.large}
              alt={photo.alt}
              className="gallery-image"
            />
            <button
              className="heart-button"
              onClick={() => toggleLike(photo.id)}
            >
              <IconHeart filled={true} />
            </button>
            <textarea
              placeholder="Añadir una nota..."
              value={notes[photo.id] || ''}
              onChange={(event) => handleNoteChange(photo.id, event)}
              className="note-textarea"
            />
          </div>
        ))}
        {favoritePhotos.length === 0 && (
          <p>No hay fotos favoritas seleccionadas.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
