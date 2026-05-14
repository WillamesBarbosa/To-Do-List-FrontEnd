import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Task from './pages/Tasks/Tasks'

function App(){
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/tasks' element={<Task/>} />
      <Route path='/register' element={<Register/>}/>
    </Routes>
  )
}

export default App