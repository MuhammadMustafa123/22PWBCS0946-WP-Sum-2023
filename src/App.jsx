import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import './App.css'
import { login, logout } from './store/authSlice'
import {Header,Footer} from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error)=>{
      console.log(error)
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  // return !loading?(
  //   <div>
  //     <Header/>
  //     <Footer/>
  //   </div>
  // ):null

  if(!loading){
    return (
      <div className='min-h-screen flex flex-wrap content-between font-mono'>
        <div className='w-full block'>
        <Header/>
      
        <Outlet/>
      
        <Footer/>
      </div>
      </div>
    )
  }
}

export default App
