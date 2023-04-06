import React, { useState } from 'react'

import './Nav.css'

const Nav = () => {
  const [showAlert, setShowAlert] =
    useState(false)

  const handleHeartClick = () => {
    setShowAlert(true)
  }

  const handleAlertClose = () => {
    setShowAlert(false)
  }

  return (
    <nav>
      <button class="logo">Antigram</button>
      <input
        type="text"
        className="search"
        placeholder="Search"
      />
      <span className="nav-links">
        <button>
          <i className="fas fa-home" />
        </button>
        <button>
          <a
            href="mailto:hello@halmaimcrae.co.nz"
            target="_blank"
          >
            <i className="far fa-comment-alt" />
          </a>
        </button>
        <button>
          <a
            href="https://www.google.com/maps/place/Wellington/@-41.2529601,174.7542577,11z/data=!3m1!4b1!4m6!3m5!1s0x6d38b1fc49e974cb:0xa00ef63a213b470!8m2!3d-41.2923814!4d174.7787463!16zL20vMDg1M2c"
            target="_blank"
          >
            <i className="far fa-compass" />
          </a>
        </button>
        <button onClick={handleHeartClick}>
          <i className="far fa-heart" />
        </button>
      </span>

      {showAlert && (
        <div className="alert-modal">
          <div className="alert-content">
            <h3>
              Thanks, but your likes mean nothing
              here.
            </h3>
            <button onClick={handleAlertClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
