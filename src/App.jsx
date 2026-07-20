import { useState, useEffect, useEffectEvent } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appWrite/auth'
import {login, logout} from './Store/authSlice'
import {Footer , Header} from './components'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().
    then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    }).
    finally(() => setLoading(false))
  },[])
  
  return !loading ? (
    <>
      <div className="min-h-screen flex  flex-wrap content-between bg-[#54E6D4]">
        <div className="block w-full">
          <Header/>
          <main>
          TODO:  <Outlet/>
          </main>
          <Footer/>
        </div>
      </div>
    </>
  ) : null
}

export default App
