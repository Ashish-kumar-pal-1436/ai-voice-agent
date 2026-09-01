
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

export const ServerUrl = "http://localhost:8000"
const App = () => {
  return (
    <>
      <Routes>
         <Route  path='/' element={ <Home />} />
         <Route  path= '/login' element={ <Login />} />
      </Routes> 
      <div>

      </div>
    </>
  )
}

export default App