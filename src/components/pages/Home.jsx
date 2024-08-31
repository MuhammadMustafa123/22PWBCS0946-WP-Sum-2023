import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import service from '../../appwrite/post'
import {PostCard }from '../index'
import { Container } from 'postcss'

function Home() {
    const isLoggedin=useSelector((state)=>state.auth.status)
    const [posts,setPosts]=useState([])
    const [loader,setLoader]=useState(true)

    const getPost=async()=>{
        try {
            const allPost=await service.getActivePosts()
            setPosts(allPost.documents)
            // console.log(allPost);
            setLoader(false)
            
        } catch (error) {
            console.log("Home jsx all post error",error)
        }
    }

    useEffect(()=>{
        getPost();
    },[])

    if(!isLoggedin){
        return (
            <div className="w-full flex py-8 mt-4 text-center align-center place-content-center">
        
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-4xl font-bold text-orange-500 hover:text-orange-500 mb-2">
                                Welcome to Blog Website
                            </h1>
                            <img src="./Blog.jpg" alt="" className='w-full h-96' />
                            <h1 className="text-4xl font-bold text-orange-500 hover:text-orange-500 mt-2">
                                    Login to read or post your Blog
                            </h1>
                        </div>
                    </div>
            
            </div>
        )
    }
    else{
        return (
            <div>
                {loader ? (
                    <div className='flex place-content-center'>
                        <div className='loader'></div>
                        </div>
                    
                ) :posts && posts.length > 0 ? (
                    <div className='w-full py-8 flex flex-wrap'>
                  
                        <div className='flex w-2/4'>
                   { posts.map((post) => (
                        <div key={post.$id} className='p-2 3/4 ml-1'>
                            <PostCard
                                $id={post.$id}
                                title={post.title}
                                featuredimage={post.featuredimage}
                            />
                        </div>
                    ))}
                    </div>
                  
                    </div>
                ) : (
                    <h1>No Posts to show</h1>
                )}
            </div>
        )
    }
    

}

export default Home
