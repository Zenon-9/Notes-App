import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import NoteEditor from './pages/NoteEditor'
import MainLayout from './components/layout/MainLayout'
import ProtectedRoute from './components/route/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        
        {/* Protected workspace routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path='/home' element={<Dashboard />} />
            <Route path='/note/:id' element={<NoteEditor />} />
          </Route>
        </Route>
        
        <Route path='*' element={<div style={{ padding: '2rem', textAlign: 'center', color: '#fff', background: '#0b0f19', minHeight: '100vh' }}><h1>404 Not Found</h1></div>} />
      </Routes>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#1e293b',
          color: '#fff',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      }} />
    </>
  )
}

export default App;