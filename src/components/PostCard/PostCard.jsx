import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import service from '../../appwrite/post'

function PostCard({$id,title,featuredimage}) {

  const [url,setUrl]=useState('')

  const fetchImage=async()=>{
    const imgUrl=await service.filePreview(featuredimage)
    if(imgUrl){
      setUrl(imgUrl)
    }
  }

  useEffect(()=>{
    fetchImage();
  },[featuredimage])
  
  
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-slate-600 rounded-xl p-4 text-center'>
            <div className='w-full justify-center mb-4'>
                <img src={url} alt={title} className='rounded-xl h-72'  />
            </div>
            <h2 className='text-xl text-white font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
