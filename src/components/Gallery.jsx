import getPhotoUrl from 'get-photo-url'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../dexie'
import { auth, provider } from '../firebase'
import { useState } from 'react'
import { signInWithPopup } from 'firebase/auth'

const Gallery = () => {
  const [user, setUser] = useState(null)

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        console.log(user)
        setUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
  }
  const allPhotos = useLiveQuery(
    () => db.gallery.toArray(),
    []
  )

  const addPhoto = async () => {
    db.gallery.add({
      url: await getPhotoUrl('#addPhotoInput'),
    })
  }

  const removePhoto = (id) => {
    db.gallery.delete(id)
  }
  return (
    <>
      {auth.currentUser ? (
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
        </>
      ) : (
        <button
          className="sign-in-button"
          onClick={handleGoogleSignIn}
        >
          <i className="fab fa-google" /> Sign in
          with Google{' '}
        </button>
      )}

      <section className="gallery">
        {!allPhotos && <p>Loading...</p>}
        {allPhotos?.map((photo) => (
          <div className="item" key={photo.id}>
            <img
              src={photo.url}
              alt=""
              className="item-image"
            />
            {user && (
              <button
                className="delete-button"
                onClick={() =>
                  removePhoto(photo.id)
                }
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </section>
    </>
  )
}

export default Gallery
