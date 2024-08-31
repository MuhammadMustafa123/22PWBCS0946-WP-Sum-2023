import config from "../config/config";


import { Client, ID,Databases,Storage,Query } from "appwrite";

export class PostService{

    client=new Client();
    database;
    bucket;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.database=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,content,featuredimage,status,userid}){
        const documentId=ID.unique()
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.log("Appwrite Service:: createPost:: Error",error);
            
        }
    }


    async updatePost(documentId,{title,content,featuredimage,status}){
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                documentId,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service:: updatePost:: Error",error);
            
        }
    }

    async deletePost(documentId){
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                documentId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service:: deletePost:: Error",error);
            return false
        }
        
    }

    async getPost(documentId){
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                documentId,
            )
        } catch (error) {
            console.log("Appwrite Service:: getPost:: Error",error);
        }
    }

    async getActivePosts(){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [Query.equal("status", ["active"])]
            )
        } catch (error) {
            console.log("Appwrite Service:: getActivePost:: Error",error);
        }
    }

    async getAllPosts(){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
               
            )
        } catch (error) {
            console.log("Appwrite Service:: getAllPost:: Error",error);
        }
    }

    //file upload services

    async createFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service:: createfile:: Error",error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service:: deletefile:: Error",error);
            return false
        }
    }

    async filePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
            
        } catch (error) {
            console.log("Appwrite Service:: filePreview:: Error",error);
        }
    }


}



const service=new PostService()

export default service