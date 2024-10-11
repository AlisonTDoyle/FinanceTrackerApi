// Imports
import { Request, Response } from "express";
import { categoryCollection, userCollection } from "../database";
import { User } from "../models/user";
import { ObjectId } from "mongodb";

// Create methods
export const createUser = async (req:Request, res:Response) => {
    try {
        // Create user
        let newUser : User = req.body as User;

        // Add to database
        const result = await userCollection.insertOne(newUser);

        // Return result of action
        if (result) {
            res.status(201).location(`${result.insertedId}`).json({
                message: `Created user with id ${result.insertedId}`
            });
        } else {
            res.status(500).send("Error: Failed to create user");
        }
    } catch (error) {
        let errorMessage : string;

        if (error instanceof Error) {
            errorMessage = `Error inserting user:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Read methods
export const readUserById = async (req:Request, res:Response) => {
    try {
        // Parse id and convert to query
        let id: string = req.params.id;
        let query = { _id: new ObjectId(id) };

        // Read in category
        const user = (await userCollection.findOne(query)) as User;

        res.status(200).json(user);
    } catch (error) {
        let errorMessage : string;

        if (error instanceof Error) {
            errorMessage = `Error fetching category:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Update methods

// Delete methods