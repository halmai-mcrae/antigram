import photo from '../assets/hmfavicon.png'
const Gallery = () => {
  return (
    <>
      <input
        type="file"
        name="photo"
        id="addPhotoInput"
        accept="image/*
    "
        multiple
      />
      <label htmlFor="addPhotoInput">
        <i className="add-photo-button fas fa-plus-circle" />
      </label>

      <section className="gallery">
        <div className="item">
          <img
            src={photo}
            alt="photo"
            className="item-image"
          />
        </div>
        <div className="item">
          <img
            src={photo}
            alt="photo"
            className="item-image"
          />
        </div>
        <div className="item">
          <img
            src={photo}
            alt="photo"
            className="item-image"
          />
        </div>
        <div className="item">
          <img
            src={photo}
            alt="photo"
            className="item-image"
          />
        </div>
        <div className="item">
          <img
            src={photo}
            alt="photo"
            className="item-image"
          />
        </div>
        <div className="item">
          <img
            src={photo}
            alt="photo"
            className="item-image"
          />
        </div>
      </section>
    </>
  )
}

export default Gallery
