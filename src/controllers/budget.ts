// Imports
import { Request, Response } from "express";
import { budgetCollection, categoryCollection } from "../database";
import { Category } from "../models/category";
import { ObjectId } from "mongodb";
import { Budget } from "../models/budget";

// Create methods
export const createBudget = async (req:Request, res:Response) => {
    try {
        // Create budget
        let newBudget : Budget = req.body as Budget;

        // Add to database
        const result = await budgetCollection.insertOne(newBudget);

        // Return result of action
        if (result) {
            res.status(201).location(`${result.insertedId}`).json({
                message: `Created budget with id ${result.insertedId}`
            });
        } else {
            res.status(500).send("Error: Failed to create budget");
        }
    } catch (error) {
        let errorMessage : string;

        if (error instanceof Error) {
            errorMessage = `Error inserting budget:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Read methods
export const readBudget = async (req:Request, res:Response) => {
    try {
        // Read in all categories
        const budgets = (await budgetCollection.find(req.body).toArray()) as Budget[];

        res.status(200).json(budgets);
    } catch (error) {
        let errorMessage : string;

        if (error instanceof Error) {
            errorMessage = `Error fetching budgets:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Update methods
export const updateBudget = async (req:Request, res:Response) => {
    try {
        // Parse id and convert to query
        let id: string = req.params.id;
        let query = { _id: new ObjectId(id) };

        // Create updated budget
        let updateBudget : Category = req.body as Category;

        // Update database
        const result = await budgetCollection.updateOne(query, {$set: updateBudget});

        // Return result of action
        if (result && result.upsertedCount) {
            res.status(202).json({ message: `Successfully updated budget with id ${id}` });
        } else if (!result) {
            res.status(400).json({ message: `Failed to update budget with id ${id}` });
        } else if (!result.upsertedCount) {
            res.status(202).json({ message: `Updated budget ${id}` });
        }
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error updating budget:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Delete methods
export const deleteBudget = async (req:Request, res:Response) => {
    try {
        // Parse id and convert to query
        let id: string = req.params.id;
        let query = { _id: new ObjectId(id) };

        // Delete from database
        const result = await budgetCollection.deleteOne(query);

        // Return result of action
        if (result && result.deletedCount) {
            res.status(202).json({ message: `Successfully removed budget with id ${id}` });
        } else if (!result) {
            res.status(400).json({ message: `Failed to remove budget with id ${id}` });
        } else if (!result.deletedCount) {
            res.status(404).json({ message: `no budget fround with id ${id}` });
        }
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error deleting budget:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};