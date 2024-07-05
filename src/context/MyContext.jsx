import { createContext, useState, useEffect, useCallback } from 'react';

export const PhotosContext = createContext();

export const PhotosProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/photos.json');
        if (!response.ok) {
          throw new Error('No se pudo completar la solicitud');
        }
        const data = await response.json();
        const initializedPhotos = data.photos.map(photo => ({
          ...photo,
          liked: false,
        }));
        setPhotos(initializedPhotos);
      } catch (error) {
        console.error('Problema al obtener las fotos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const toggleLike = useCallback((id) => {
    setPhotos(prevPhotos =>
      prevPhotos.map(photo =>
        photo.id === id ? { ...photo, liked: !photo.liked } : photo
      )
    );
  }, []);

  return (
    <PhotosContext.Provider value={{ photos, toggleLike }}>
      {children}
    </PhotosContext.Provider>
  );
};
