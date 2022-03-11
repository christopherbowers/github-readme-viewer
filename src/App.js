// import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import './styles.css'

function App() {
  return (
    <>
    <Routes>
      <Route path="/github/:user" element={<Home />} />
    </Routes>

    </>
  )
}

export default App
