const Nav = () => {
  return (
    <nav>
      <button class="logo">Antigram</button>
      <input
        type="text"
        className="search"
        placeholder="I'm looking for..."
      />
      <span className="nav-links">
        <button>
          <i className="fas fa-home" />
        </button>
        <button>
          <i className="far fa-comment-alt" />
        </button>
        <button>
          <i className="far fa-compass" />
        </button>
        <button>
          <i className="far fa-heart" />
        </button>
      </span>
    </nav>
  )
}

export default Nav
