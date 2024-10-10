// Imports
import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";

// Environmental variables
dotenv.config();

const connectionString: string = process.env.CONNECTION_STRING || "";
const databaseName: string = process.env.DATABASE_NAME || "";

// Connect to database
const client: MongoClient = new MongoClient(connectionString);

