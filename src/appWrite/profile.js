import conf from "../conf/conf";
import { Databases, ID, Query, Storage,Client } from "appwrite";

export class ProfileService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.AppwriteUrl)
            .setProject(conf.AppwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createProfile({ userId, bio, avtar }){
        try {
            return await this.databases.createDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteProfileCollectionId,
                userId,        // used as the document ID
                {
                    bio,
                    avtar,     // userId NOT duplicated here
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(userId, { bio, avtar }){
        try {
            return await this.databases.updateDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteProfileCollectionId,
                userId,       
                {
                    bio,
                    avtar,
                }
            )
        }
        catch (error) {
            throw error;
        }
    }

    async getProfile(userId){  
        try {
            return await this.databases.getDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteProfileCollectionId,
                userId
            );
        } catch (error) {
            throw error;
        }
    }

    
}

const profileService = new ProfileService();

export default profileService
