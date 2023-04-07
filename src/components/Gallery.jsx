import React, { useState } from 'react'
import getPhotoUrl from 'get-photo-url'

const Gallery = () => {
  const [allPhotos, setAllPhotos] = useState([])

  const addPhoto = async () => {
    const newPhoto = {
      id: Date.now(),
      url: await getPhotoUrl('#addPhotoInput'),
    }
    setAllPhotos([...allPhotos, newPhoto])
  }
  return (
    <>
      <input
        type="file"
        accept="image/*"
        name="photo"
        id="addPhotoInput"
      />
      <label
        htmlFor="addPhotoInput"
        onClick={addPhoto}
      >
        <i className="add-photo-button fas fa-plus-circle" />
      </label>
      <section className="gallery">
        {allPhotos.map((photo, index) => (
          <div className="item" key={photo.id}>
            <img
              src={photo.url}
              alt=""
              className="item-image"
            />
          </div>
        ))}
      </section>
    </>
  )
}

export default Gallery
