import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authSlice from "../store/authSlice"

function AuthLayout({children,authentication=true}) {

    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector((state)=>state.auth.status)
    

    useEffect(()=>{
            if(authentication && authStatus!==authentication){
                navigate("/login")
                
            }
            else if(!authentication && authStatus!==authentication){
                navigate("/")
                
            }
            else{
              setLoader(false)
            }
    },[authStatus,navigate,authentication])



    if (loader) {
      return <div className='loader'></div>; // Display a loading message if needed
  }

  return (
      <div>
          {children} {/* Render child components */}
      </div>
  );
}

export default AuthLayout
