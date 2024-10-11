// Imports
import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";
import { Category } from "./models/category";
import { User } from "./models/user";

// Environmental variables
dotenv.config();

const connectionString: string = process.env.CONNECTION_STRING || "";
const databaseName: string = process.env.DATABASE_NAME || "";

// Set up connection
let database:Db;
let client: MongoClient = new MongoClient(connectionString);

export let categoryCollection : Collection<Category>;
export let userCollection : Collection<User>;

export let collections:{
    categories?: Collection<Category>
    users?: Collection<User>
} = {};

// Connect to database
client.connect().then(() => {
    database = client.db(databaseName);

    // Read in data
    categoryCollection = database.collection('categories');
    userCollection = database.collection('users');

    collections.categories = categoryCollection;
    collections.users = userCollection;

    console.log("Connected to database");
}).catch((error) => {
    if (error instanceof Error) {
        console.log(`Issue with database connection ${error.message}`);
    } else {
        console.log(`Error with ${error}`);
    }
});