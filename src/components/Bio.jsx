import logo from '../assets/hmfavicon.png'

const Bio = () => {
  const userDetails = {
    name: 'Halmai McRae',
    about: 'The things I like.',
  }

  return (
    <section className="bio">
      <div className="profile-photo">
        <img src={logo} alt="profile" />
      </div>
      <div className="profile-info">
        <h1>{userDetails.name}</h1>
        <p>{userDetails.about}</p>
      </div>
    </section>
  )
}

export default Bio
