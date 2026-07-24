import conf from "../conf/conf";
import { Databases, ID, Query, Storage,Client } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.AppwriteUrl)
            .setProject(conf.AppwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, content, slug, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
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
            throw error
        }
    }

    async updatePost(slug ,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
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
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
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
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
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
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
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
                conf.AppwriteBucketId,
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
            await this.bucket.deleteFile( conf.AppwriteBucketId, fileId );
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false;
        }
    }

    getFileView(fileId){
        return this.bucket.getFileView( conf.AppwriteBucketId, fileId )
    }
}

const service = new Service()

export default service