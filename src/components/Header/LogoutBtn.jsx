import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../../store/authSlice'
import Button from '../button/Button'
import authService from '../../appwrite/auth'

function LogoutBtn() {

    const dispatch=useDispatch()

    const logoutHandler=async()=>{
      try {
        await authService.logout() ;  //in appwrite most of things are promoises so it reutrn
      
        dispatch(logout());   //if logout successfully, then logout from store also so state is updated
      } catch (error) {
        console.log(error);
        
      }
      
      
      
    }
  return (
    <Button text="LogOut" onClick={logoutHandler}
    className='inline-bock px-6 py-2 bg-red-300 duration-200 hover:bg-black hover:text-red-500 rounded-full'
    />
  )
}

export default LogoutBtn
