import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/post';
import {Input,Select,Editor,Button} from '../index'

function PostForm({post}) {

    const navigate=useNavigate();
    const userData=useSelector((state)=>state.auth.userData)
    const [url,setUrl]=useState('')


    const {register,getValues,setValue,handleSubmit,control}=useForm({
        defaultValues:{
            title:post?.title || '',
            content:post?.content || '',
            status:post?.status || ''
        }
    })

    useEffect(() => {
        //console.log('userData in PostForm:', userData);
    }, [userData]);
    

    const postSubmit=async(data)=>{
       // console.log(data);
    
            try {
                if(post){
                    const file= data.image[0]?await service.createFile(data.image[0]):null
                    
            
                    
                    if(file){
                        await service.deleteFile(post.featuredimage)
                    }
     
                const dbPost=await service.updatePost(post.$id,{
                    ...data,
                    featuredimage:file?file.$id:post.featuredimage,
                    content:String(data.content).substring(0, 255)
                }) 
    
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
    
                }
                else{
                    const file= await data.image[0]?await service.createFile(data.image[0]):null
                
                    
                    if(file){
                        const dbPost=await service.createPost({
                            ...data,
                            featuredimage:file.$id,
                            userid:userData.$id,
                            content:String(data.content).substring(0, 255)
                        })
                        if(dbPost){
                            navigate(`/post/${dbPost.$id}`)
                        }
                
                    }
                    
                }
            } catch (error) {
                console.log(error)
            }
        
        
    }

    const fetchImage=async()=>{
        try {
            if(post){
                const imgUrl=await service.filePreview(post.featuredimage)
                if(imgUrl){
                setUrl(imgUrl)
                }
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
      fetchImage();
    },[post])

    return userData?(
        <form onSubmit={handleSubmit(postSubmit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
    <Input
    label='Title'
    type='text'
    placeholder='Write your Blog Title here'
    className="mb-4"
    {...register('title',{
        required:true
    })}
    />

<Editor
    label="Content"
    name="content"
    defaultValue={getValues('content')}
    control={control}
    {...register('content',{
        required:true
})}
    />

    </div>
    
    <div className="w-1/3 px-2">
<Input
    className="mb-4"
    label='Image'
    type='file'
    accept='image/png, image/jpg, image/png,image/jpeg, image/gif'
    {...register('image',{
        required:!post
    })}
    />

    {post && (
        <div className="w-full mb-4">
            <img src={url} alt={post.title} className="rounded-lg" />
        </div>
    )}

    <Select
    label={"Status"}
    options={['active','inactive']}
    className="mb-4"
    {...register('status',{
        required:true
    })}
    />

    <Button
    text={post?"Update":"Submit"}
    type='submit'
    className="w-full text-white hover:bg-orange-700"
    bgColor={post?"bg-green-500":"bg-orange-500"}
    />

</div>
    </form>
    ):(
        <div >
            Refresh Page to Load Data
        </div>
    )
    

}

export default PostForm
