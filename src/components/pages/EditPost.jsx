import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import service from '../../appwrite/post'
import {PostForm,Container } from '../index'

function EditPost() {
    const [post,setPost]=useState()
    const {id}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(id){
            service.getPost(id).then((getPost)=>{
                if(getPost){
                    setPost(getPost)
                }
            })
        }
        else{
            navigate('/')
        }
    },[id,navigate])
    

  return post?(
    <div className='py-8'>
        <Container>
        <PostForm post={post}/>

        </Container>
    </div>
):null
}
export default EditPost
