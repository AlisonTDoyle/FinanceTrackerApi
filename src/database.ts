// Imports
import { MongoClient, Db, Collection } from "mongodb";
import dotenv from "dotenv";
import { User } from "./models/user";
import { Transaction } from "./models/transaction";
import { Budget } from "./models/budget";
import { Category } from "./models/category";

// Environmental variables
dotenv.config();

const connectionString: string = process.env.CONNECTION_STRING || "";
const databaseName: string = process.env.DATABASE_NAME || "";

// Set up connection
let database:Db;
let client: MongoClient = new MongoClient(connectionString);

export let userCollection : Collection<User>;
export let transactionCollection: Collection<Transaction>;
export let budgetCollection: Collection<Budget>;
export let categoryCollection: Collection<Category>;

export let collections:{
    users?: Collection<User>
    transactions?: Collection<Transaction>
    budgets?: Collection<Budget>
    categories?: Collection<Category>
} = {};

// Connect to database
client.connect().then(() => {
    database = client.db(databaseName);

    // Read in data
    userCollection = database.collection('users');
    transactionCollection = database.collection('transactions');
    budgetCollection = database.collection('budgets');
    categoryCollection = database.collection('categories');

    collections.users = userCollection;
    collections.transactions = transactionCollection;
    collections.budgets = budgetCollection;
    collections.categories = categoryCollection;

    console.log("Connected to database");
}).catch((error) => {
    if (error instanceof Error) {
        console.log(`Issue with database connection ${error.message}`);
    } else {
        console.log(`Error with ${error}`);
    }
});