import React, { useState, useRef } from 'react'
import logo from '../assets/hmfavicon.png'

import './Bio.css'

const Bio = () => {
  const userDetails = {
    name: 'Halmai McRae',
    about: 'The things I like.',
    linkedin:
      'https://www.linkedin.com/in/halmai-mcrae/',
    github: 'https://github.com/halmai-mcrae',
    website: 'https://halmaimcrae.co.nz',
    strava:
      'https://www.strava.com/athletes/112599020',
    medium: 'https://medium.com/@halmai-mcrae',
  }

  const [showModal, setShowModal] =
    useState(false)

  const inputRef = useRef(null)

  const handleFollowClick = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    const followButton = document.querySelector(
      '.follow-button'
    )
    if (followButton) {
      followButton.checked = false
    }
  }

  return (
    <section className="bio">
      <div className="profile-photo">
        <img src={logo} alt="profile" />
      </div>
      <div className="profile-info">
        <h1>{userDetails.name}</h1>
        <p>{userDetails.about}</p>
        <input
          className="follow-button"
          type="checkbox"
          onClick={handleFollowClick}
          ref={inputRef}
        />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Links</h3>
            <div class="social-container">
              <a
                href={userDetails.github}
                target="_blank"
                class="social"
              >
                <i class="fab fa-github"></i>
              </a>
              <a
                href={userDetails.strava}
                target="_blank"
                class="social"
              >
                <i class="fab fa-strava"></i>
              </a>
              <a
                href={userDetails.medium}
                target="_blank"
                class="social"
              >
                <i class="fab fa-medium"></i>
              </a>
              <a
                href={userDetails.linkedin}
                target="_blank"
                class="social"
              >
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a
                href={userDetails.website}
                target="_blank"
                class="social"
              >
                <i class="fas fa-heart"></i>
              </a>
            </div>

            <button onClick={handleModalClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Bio
