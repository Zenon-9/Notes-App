import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Note from './pages/Note'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route element={<MainLayout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/note/:id' element={<Note />} />
      </Route>
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}

export default App;