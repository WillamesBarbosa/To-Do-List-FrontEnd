import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Task from './pages/Tasks/Tasks'
import { PrivateRoute } from '../@/components/PrivateRoute/PrivateRoute'
import { getToken } from './services/auth'
import Profile from './pages/Profile/Profile'

function App(){
  const token = getToken()


  return (
    <Routes>
      <Route path='/' element={token ? <Navigate to='/tasks' replace /> : <Login/>} />
        <Route path='/tasks' element={
          <PrivateRoute>
            <Task/>
          </PrivateRoute>
          } />
      <Route path='/register' element={<Register/>}/>
      <Route path="/profile" element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default App