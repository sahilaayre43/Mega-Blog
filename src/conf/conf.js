import { AppwriteException } from "appwrite"

const conf = {
    AppwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    AppwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    AppwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    AppwriteProfileCollectionId: String(import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID),
    AppwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf