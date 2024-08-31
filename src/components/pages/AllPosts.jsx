import React, { useEffect,useState } from 'react'
import service from '../../appwrite/post'
import { PostCard } from '../index'

function AllPosts() {
    const [posts,setPosts]=useState([])

    useEffect(()=>{
        service.getAllPosts().then((post)=>{
            if(post){
                setPosts(post.documents)
               // console.log(post.documents);
                
            }
        })
        .catch((error)=>{
          console.log(error);
          
        })
    }

    ,[])

    if(posts.length!==0){
      return (
        <div className='w-full py-8 flex flex-wrap'>
         
            <div className='flex'>
            {posts.map((post)=>{
              return  <div key={post.$id} className='p-2 w-2/4'>
                    <PostCard 
                    $id={post.$id}
                    featuredimage={post.featuredimage}
                    title={post.title}
                    />
                </div>
            })}
            </div>
         
        </div>
      )
    }
    else{
      return(
        <div className='flex place-content-center'>
        <div className='loader'></div>
        </div>
      )
      
    
    }

  
  
}

export default AllPosts
