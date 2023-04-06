import { useState } from 'react'
import { Nav, Bio, Gallery } from './components'
import './App.css'

const App = () => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <Nav toggleTheme={toggleTheme} />
      <div className={`container ${theme}`}>
        <Bio />
        <Gallery />
      </div>
    </>
  )
}

export default App
