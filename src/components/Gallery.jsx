import { useEffect, useState } from 'react'
import getPhotoUrl from 'get-photo-url'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../dexie'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

import './Gallery.css'

const Gallery = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user)
      }
    )
    return unsubscribe
  }, [])

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
    auth.signOut()
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
      {auth.currentUser && user ? (
        <>
          <input
            type="file"
            accept="image/*"
            name="photo"
            id="addPhotoInput"
          />
          <label
            className="add-photo-mobile fas fa-plus-circle"
            htmlFor="addPhotoInput"
            onClick={addPhoto}
          >
            <span> Add photo</span>
            <i className="add-photo-button fas fa-plus-circle" />
          </label>
          {auth.currentUser && user ? (
            <>
              <div className="logout">
                <button onClick={handleLogout}>
                  <i className="fab fa-google" />{' '}
                  Sign out
                </button>
                <h3 className="welcome-content">
                  Welcome{' '}
                  {auth.currentUser.displayName}
                </h3>
                <p className="welcome-content">
                  {auth.currentUser.email}
                </p>
              </div>
            </>
          ) : null}
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
        {allPhotos
          ?.slice()
          .reverse()
          .map((photo) => (
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
