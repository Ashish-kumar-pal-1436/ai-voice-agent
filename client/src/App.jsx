
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export const ServerUrl = "http://localhost:8000"
const App = () => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() =>{
     const fetchMe = async () => {
       try {
         const res = await axios.get(ServerUrl + "/api/user/current-user", {withCredentials: true})
         console.log(res.data)
         setUser(res.data)
         setLoading(false)
       } catch (error) {
          console.log(error)
       }
     }

     fetchMe()
  },[])

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