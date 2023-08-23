import { useEffect, useState } from 'react'
import {
  auth,
  provider,
  storage,
} from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  list,
} from 'firebase/storage'

import './Gallery.css'

const Gallery = () => {
  const [user, setUser] = useState(null)
  const [imageUpload, setImageUpload] =
    useState(null)
  const [imageUrls, setImageUrls] = useState([])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user)
      }
    )
    return unsubscribe
  }, [])

  const imagesRef = ref(storage, 'images/')

  const uploadFile = () => {
    if (imageUpload == null) return
    const fileName = `${Date.now()}_${
      imageUpload.name
    }`
    const imageRef = ref(
      storage,
      `images/${fileName}`
    )
    uploadBytes(imageRef, imageUpload).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then(
          (url) => {
            setImageUrls((prev) => [url, ...prev])
          }
        )
      }
    )
  }

  useEffect(() => {
    list(imagesRef).then((response) => {
      const items = response.items
      // Sort items based on file name (timestamp or sequential number)
      items.sort((a, b) => {
        const nameA = a.name
        const nameB = b.name
        return nameB.localeCompare(nameA)
      })
      // Retrieve download URL for each item in the sorted order
      Promise.all(
        items.map((item) => {
          return getDownloadURL(item)
        })
      ).then((urls) => {
        setImageUrls(urls)
      })
    })
  }, [imagesRef])

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
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

  return (
    <>
      {auth.currentUser && user ? (
        <>
          <input
            type="file"
            accept="image/*"
            id="addPhotoInput"
            onChange={(e) =>
              setImageUpload(e.target.files[0])
            }
          />
          <label
            className="add-photo-button"
            htmlFor="addPhotoInput"
            onClick={uploadFile}
          >
            <i className="fas fa-plus-circle" />{' '}
            Add Post
          </label>
          <div className="logout">
            <button onClick={handleLogout}>
              <i className="fab fa-google" /> Sign
              out
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
      ) : (
        <button
          className="sign-in-button"
          onClick={handleGoogleSignIn}
        >
          <i className="fab fa-google" /> Sign in
          with Google
        </button>
      )}
      <div className="gallery-container">
        <section className="gallery">
          {!imageUrls && <p>Loading...</p>}
          {imageUrls.map((url) => (
            <div className="item" key={url}>
              <img
                src={url}
                alt=""
                className="item-image"
              />
              {user && (
                <button className="delete-button">
                  Delete
                </button>
              )}
            </div>
          ))}
        </section>
      </div>
    </>
  )
}

export default Gallery
