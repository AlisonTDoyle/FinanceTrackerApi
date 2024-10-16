// Imports
import { Request, Response } from "express";
import { userCollection } from "../database";
import { User, ValidateUser } from "../models/user";
import { ObjectId } from "mongodb";
import Joi from "joi";

// Create methods
export const createUser = async (req:Request, res:Response) => {
    try {
        // Validate user to be entered
        let validationResult: Joi.ValidationResult = ValidateUser(req.body);

        if (validationResult.error) {
            res.status(400).json(validationResult.error);
            return;
        }

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
export const updateUser = async (req:Request, res:Response) => {
    try {
        // Validate updated details
        let validationResult: Joi.ValidationResult = ValidateUser(req.body);

        if (validationResult.error) {
            res.status(400).json(validationResult.error);
            return;
        }

        // Parse id and convert to query
        let id: string = req.params.id;
        let query = { _id: new ObjectId(id) };

        // Create updated user
        let updateUser : User = req.body as User;

        // Update database
        const result = await userCollection.updateOne(query, {$set: updateUser});

        // Return result of action
        if (result && result.upsertedCount) {
            res.status(202).json({ message: `Successfully updated user with id ${id}` });
        } else if (!result) {
            res.status(400).json({ message: `Failed to update user with id ${id}` });
        } else if (!result.upsertedCount) {
            // res.status(404).json({ message: `no user fround with id ${id}` });
            res.status(202).json({ message: `Updated user ${id}` });
        }
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error updating user:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
}

// Delete methods
export const deleteUser = async (req:Request, res:Response) => {
    try {
        // Parse id and convert to query
        let id: string = req.params.id;
        let query = { _id: new ObjectId(id) };

        // Delete from database
        const result = await userCollection.deleteOne(query);

        // Return result of action
        if (result && result.deletedCount) {
            res.status(202).json({ message: `Successfully removed user with id ${id}` });
        } else if (!result) {
            res.status(400).json({ message: `Failed to remove user with id ${id}` });
        } else if (!result.deletedCount) {
            res.status(404).json({ message: `no user fround with id ${id}` });
        }
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error deleting user:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};