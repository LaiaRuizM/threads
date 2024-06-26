//appwriteConfig: This will store all the configuration for the appwrite project.
import { Client, Databases, Functions, Storage, Account } from "appwrite";

const client = new Client();

export const VITE_ENDPOINT = import.meta.env.VITE_ENDPOINT;
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DEV_DB_ID = import.meta.env.VITE_DB_ID;
export const COLLECTION_ID_THREADS = import.meta.env.VITE_COLLECTION_ID_THREADS;
export const BUCKET_ID_IMAGES = import.meta.env.VITE_BUCKET_ID_IMAGES;
//export const EXECUTION_METHOD = import.meta.env.VITE_EXECUTION_METHOD;

export const COLLECTION_ID_PROFILES = "663011060020bae47a1d";
export const COLLECTION_ID_COMMENTS = "663845260014f8dede7e";
// export const COLLECTION_ID_PROFILES = import.meta.env
//   .VITE_COLLECTION_ID_PROFILES;

client.setEndpoint(VITE_ENDPOINT).setProject(PROJECT_ID);

//Instances:
export const account = new Account(client); // This is how we're going to authenticate register and so on with the users.
export const database = new Databases(client);
export const functions = new Functions(client);
export const storage = new Storage(client);
export default client;
