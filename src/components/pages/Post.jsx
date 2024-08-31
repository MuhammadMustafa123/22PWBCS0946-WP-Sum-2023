import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams,Link } from 'react-router-dom'
import parse from 'html-react-parser'
import service from '../../appwrite/post'
import {Button} from '../index'


function Post() {
    const [post,setPost]=useState(null)
    const [url,setUrl]=useState('')
    const {id}=useParams()
    const navigate=useNavigate()
    const userData=useSelector((state)=>(state.auth.userData))
    // console.log(post);
    
   const isAuthor=post && userData? post.userid===userData.$id :false
   
    useEffect(()=>{
      if(id){
        service.getPost(id).then((A_post)=>{
          if(A_post){
            setPost(A_post)

          }

      })
      }
      else{
        navigate('/')
      }
        
    },[id,navigate])

    

  const fetchImage=async()=>{
    if(post){
      try {
        const imgUrl=await service.filePreview(post.featuredimage)
    if(imgUrl){
      setUrl(imgUrl)
    }
      } catch (error) {
        console.log(error);
        
      }
    }
    
  }

  useEffect(()=>{
    fetchImage();
  },[post])

    

    const deletePost=async(id)=>{
      try {
        await service.deletePost(id)
        navigate("/")
      } catch (error) {
        console.log(error);
        
      }
    }
   

  return post?(
    <div className="py-8">
      <div className="w-full mb-6 text-center">
                <h1 className='text-5xl font-bold'>{post.title}</h1>
              </div>
 
      <div className="w-full align-center place-content-center flex mb-4 relative rounded-xl p-2">
        <img src={url} alt={post.title} className="rounded-xl w-2/4 h-96"/>

        
              </div>
              <div className="browser-css flex bg-gray-300 m-3">
                {parse(post.content)}
              </div>

              { isAuthor &&(
          <div className="w-full flex place-content-center">
            <Link to={`/edit-post/${post.$id}`}>
            <Button text="Edit" bgColor="bg-blue-500" className="mr-3 hover:bg-blue-600 text-white"/>
            </Link>

            <Button text="Delete" bgColor="bg-red-400" onClick={()=>{deletePost(post.$id)}}
              className='hover:bg-red-500 text-white'
              />
        
              </div>
        )}
      </div>
    
  ):null
}

export default Post
