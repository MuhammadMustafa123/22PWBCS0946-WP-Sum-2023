import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/auth'
import { login as authLogin } from '../../store/authSlice'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Input,Button,Logo} from '../index'

function LoginForm() {

    const {register,handleSubmit}=useForm()
    const [errors,setErrors]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const authStatus=useSelector((state)=>state.auth.status)



    const login=async(data)=>{
        setErrors('')


        try {
            const session=await authService.login(data)
        if(session){
            const user=await authService.getCurrentUser()
            console.log(user);
            
            if(user){
                dispatch(authLogin({user}))
                    navigate('/')
                    window.location.reload();


            }
        }
        } catch (error) {
            setErrors(error.message || 'An unexpected error occurred.');
        }
        
    }
    
    if(!authStatus){

        return (
            <div
            className='flex items-center justify-center w-full'
            >
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                            <span className="inline-block w-full max-w-[60px] h-16">
                                <Logo />
                            </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>

                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />

                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                        />

                        <Button
                        type="submit"
                        className="w-full text-white"
                        text="Sign in"
                        bgColor='bg-gray-700'
                        />   

                        <p className="mt-2 text-center text-base text-black/60">
                            Don&apos;t have any account?&nbsp;
                            <Link
                                to="/signup"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                               <span className='font-bold text-orange-500'>Sign Up</span>
                            </Link>
                        </p>
                            {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}

                    </div>
                </form>
                </div>
            </div>
          )
}

}

export default LoginForm
