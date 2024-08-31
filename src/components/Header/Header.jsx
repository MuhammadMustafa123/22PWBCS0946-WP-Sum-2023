import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {Container,Logo} from '../index'
import LogoutBtn from './LogoutBtn'

function Header() {
    const authStatus=useSelector((state)=>state.auth.status)
    const navigate=useNavigate()

    const navItems=[
      {
        name:"Home",
        url:"/",
        active:true
      },
      {
        name:"Login",
        url:"/login",
        active:!authStatus    //means if auth status true then it will be false, which mean it won't be dispalyed in navbar as it       is already logged in
      },
      {
        name:"SignUp",
        url:"/signup",
        active:!authStatus
      },
      {
        name:"AllPost",
        url:"/all-posts",
        active:authStatus 
      },
      {
        name:"AddPost",
        url:"/add-post",
        active:authStatus   //if auth status true then display
      },
    ]

  return (
    <header className='py-3 shadow bg-gray-100'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
            <Logo/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item)=>{
            return item.active?(
                <li key={item.name}>
                  <button onClick={()=>navigate(item.url)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-green-300 rounded-full font-semibold'>
                    {item.name}
                  </button>
                </li>
              ):null
            })}
          </ul>
          {authStatus && (
            <li className='list-none ml-3 '>
              <LogoutBtn
              />
            </li>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header
