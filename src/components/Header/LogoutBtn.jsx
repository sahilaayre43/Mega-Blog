import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../../Store/authSlice'
import authService from '../../appWrite/auth'

function LogoutBtn() {

const dispatch = useDispatch()
const logoutHandler = () => {
    authService.logout().then(() => {
        dispatch(logout())
    })
}

  return (
    <button
    className='flex items-center gap-2 bg-[#17d8d4] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
