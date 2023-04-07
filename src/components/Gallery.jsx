import getPhotoUrl from 'get-photo-url'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../dexie'

const Gallery = () => {
  const allPhotos = useLiveQuery(
    () => db.gallery.toArray(),
    []
  )

  const addPhoto = async () => {
    db.gallery.add({
      url: await getPhotoUrl('#addPhotoInput'),
    })
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
        {!allPhotos && <p>Loading...</p>}
        {allPhotos?.map((photo) => (
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
