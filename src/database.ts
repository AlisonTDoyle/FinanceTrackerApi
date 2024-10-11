// Imports
import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";
import { Category } from "./models/category";

// Environmental variables
dotenv.config();

const connectionString: string = process.env.CONNECTION_STRING || "";
const databaseName: string = process.env.DATABASE_NAME || "";

// Set up connection
let database:Db;
let client: MongoClient = new MongoClient(connectionString);

export let categoryCollection : Collection<Category>;

export let collections:{
    categories?: Collection<Category>
} = {};

// Connect to database
client.connect().then(() => {
    database = client.db(databaseName);

    // Read in data
    categoryCollection = database.collection('categories');
    collections.categories = categoryCollection;

    console.log("Connected to database");
}).catch((error) => {
    if (error instanceof Error) {
        console.log(`Issue with database connection ${error.message}`);
    } else {
        console.log(`Error with ${error}`);
    }
});