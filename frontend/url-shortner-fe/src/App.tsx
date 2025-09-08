import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPages from './components/LandingPages'
import AboutPage from './components/AboutPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<LandingPages />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
