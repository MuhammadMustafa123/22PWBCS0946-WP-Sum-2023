import React,{useState} from 'react'
import authService from '../../appwrite/auth'
import { login } from '../../store/authSlice'
import { Link,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Input,Button,Logo} from '../index'
import { useForm } from 'react-hook-form'



function SignUpForm() {

    const {register,handleSubmit}=useForm()
    const [errors,setErrors]=useState('')
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const create=async(data)=>{
        setErrors('')
        try {
            const user=await authService.createAccount(data)
            if(user){
                const userData=await authService.getCurrentUser()
                if(userData){
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setErrors(error.message)
        }
    }


    return (
        <div className="flex items-center justify-center">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[60px] h-16">
                            <Logo  />
                        </span>
                    </div>

                    <h2 className="text-center text-2xl font-bold leading-tight my-2">Sign up to create account</h2>

                    <form onSubmit={handleSubmit(create)}>
                        <div className='space-y-5'>
                            <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                            />

                            <Input
                            label="Email"
                            type="email"
                            placeholder="Write your Email"
                            {...register("email",{
                                required:true,
                                pattern:{
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Please enter a valid email address",
                                }
                            })}
    
                            />
                            
                            <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,})}
                            />

                            <Button type="submit" bgColor="bg-gray-700" className="w-full text-white" text="Create Account"/>

                           
                    <p className="text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            <span className='font-bold text-orange-500'>Sign In</span>
                        </Link>
                    </p>
                    {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
    
                        </div>
                    </form>
                </div>
    
        </div>
      )
}

export default SignUpForm
