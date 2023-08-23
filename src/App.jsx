import { Nav, Bio, Gallery } from './components'

import './App.css'

const App = () => {
  return (
    <>
      <Nav />
      <div className="container">
        <Bio />
      </div>
      <div className="main-container">
        <Gallery />
      </div>
    </>
  )
}

export default App
