import { Routes, Route } from 'react-router-dom'
import User from './pages/user'
import Landing from './pages/landing'
import './styles.css'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/github/:user" element={<User />} />
    </Routes>
    </>
  )
}

export default App
