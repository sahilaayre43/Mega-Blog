import React, { useEffect, useState } from 'react'
import {Container, Logo, LogoutBtn} from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import User2 from '../../assets/user2.png';
import profileService from '../../appWrite/profile'; 
import service from '../../appWrite/config'; 

function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      profileService.getProfile(userData.$id)
        .then((data) => setProfile(data))
        .catch((error) => console.log("No profile found:", error))
        .finally(() => setLoading(false))
    }, [userData.$id])
  

  const navItem = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: 'Login',
      slug: "/login",
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: "/add-post",
      active: authStatus,
    },
    {
      name:<img src={profile?.avtar ? service.getFileView(profile.avtar) : {User2}}
                alt=""
                className="h-8 w-8 bg-gray-300 rounded-full"
              />,
      slug: '/profile',
      active: authStatus,
    },
  ]

  return (
    <header className="py-3 shadow bg-[#171A1A] text-white">
  <Container>
    <nav className="flex">

      <div className="w-[220px] h-10 flex items-center mt-2">
        <Link to="/">
          <Logo width="" />
        </Link>
      </div>

      <ul className="flex ml-auto items-center">
        {navItem.map((item) =>
          item.active ? (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className="inline-block text-xl px-4 py-2 duration-200 hover:bg-[#54E6D4] rounded-full"
              >
                {item.name}

                {item.slug === location.pathname && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-10 -translate-x-1/2 bg-[#00D9CC]" />
                )}

              </button>
            </li>
          ) : null
        )}
      </ul>

    </nav>
  </Container>
</header>
  )
}

export default Header
