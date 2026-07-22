 import confg from "../confg/confg";
import { Databases, ID, Query, Storage,Client } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(confg.AppwriteUrl)
            .setProject(confg.AppwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, content, slug, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                confg.AppwriteDatabaseId,
                confg.AppwriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId, 
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug ,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                confg.AppwriteDatabaseId,
                confg.AppwriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                confg.AppwriteDatabaseId,
                confg.AppwriteCollectionId,
                slug, 
            )

            return true

        } catch (error) {
            throw error
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                confg.AppwriteDatabaseId,
                confg.AppwriteCollectionId,
                slug, 
            )

            return true

        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                confg.AppwriteDatabaseId,
                confg.AppwriteCollectionId,
                queries, 
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                confg.AppwriteBucketId,
                ID.unique(),
                file, 
            )

        } catch (error) {
             console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile( confg.AppwriteBucketId, fileId );
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false;
        }
    }

    getFileView(fileId){
        return this.bucket.getFileView( confg.AppwriteBucketId, fileId )
    }
}

const service = new Service()

export default service