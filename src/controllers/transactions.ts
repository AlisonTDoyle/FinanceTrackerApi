// Imports
import { Request, Response } from "express";
import { transactionCollection } from "../database";
import { Transaction } from "../models/transaction";
import { ObjectId } from "mongodb";

// Create methods
export const createTransaction = async (req:Request, res:Response) => {
    try {
        // Create transaction
        let newTransaction : Transaction = req.body as Transaction;

        // Add to database
        const result = await transactionCollection.insertOne(newTransaction);

        // Return result of action
        if (result) {
            res.status(201).location(`${result.insertedId}`).json({
                message: `Created transaction with id ${result.insertedId}`
            });
        } else {
            res.status(500).send("Error: Failed to create transaction");
        }
    } catch (error) {
        let errorMessage : string;

        if (error instanceof Error) {
            errorMessage = `Error inserting transaction:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Read methods
export const readTransaction = async (req:Request, res:Response) => {
    try {
        // Read in all categories
        const transactions = (await transactionCollection.find(req.body).toArray()) as Transaction[];

        res.status(200).json(transactions);
    } catch (error) {
        let errorMessage : string;

        if (error instanceof Error) {
            errorMessage = `Error fetching transactions:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Update methods
export const updateTransaction = async (req:Request, res:Response) => {
    try {
        // Parse id and convert to query
        let id: string = req.params.id;
        let query = { _id: new ObjectId(id) };

        // Create updated user
        let updateTransaction : Transaction = req.body as Transaction;

        // Update database
        const result = await transactionCollection.updateOne(query, { $set: updateTransaction });

        // Return result of action
        if (result && result.upsertedCount) {
            res.status(202).json({ message: `Successfully Transaction user with id ${id}` });
        } else if (!result) {
            res.status(400).json({ message: `Failed to update Transaction with id ${id}` });
        } else if (!result.upsertedCount) {
            // res.status(404).json({ message: `no user fround with id ${id}` });
            res.status(202).json({ message: `Updated Transaction ${id}` });
        }
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error updating Transaction:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }

}

// Delete methods