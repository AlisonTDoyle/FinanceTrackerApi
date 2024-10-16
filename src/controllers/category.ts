// Imports
import { Request, Response } from "express";
import { categoryCollection } from "../database";
import { Category, ValidateCategory } from "../models/category";
import { ObjectId } from "mongodb";
import Joi from "joi";

// Create methods
export const createCategory = async (req:Request, res:Response) => {
    try {
        // Validate category to be entered
        let validationResult : Joi.ValidationResult = ValidateCategory(req.body);

        if (validationResult.error) {
            res.status(400).json(validationResult.error);
            return;
        }

        // Create category
        let newCategory : Category = req.body as Category;

        // Add to database
        const result = await categoryCollection.insertOne(newCategory);

        // Return result of action
        if (result) {
            res.status(201).location(`${result.insertedId}`).json({
                message: `Created category with id ${result.insertedId}`
            });
        } else {
            res.status(500).send("Error: Failed to create category");
        }
    } catch (error) {
        let errorMessage : string;

        if (error instanceof Error) {
            errorMessage = `Error inserting category:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Read methods
export const readCategory = async (req:Request, res:Response) => {
    try {
        // Filter categories to read in
        // let filter  = req.body;
        // console.log(req.body);
        // let filterString:JSON = req.body ? JSON.parse(filter as string) : {}; 

        // Read in all categories
        const categories = (await categoryCollection.find(req.body).toArray()) as Category[];

        res.status(200).json(categories);
    } catch (error) {
        let errorMessage : string;

        if (error instanceof Error) {
            errorMessage = `Error fetching categories:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

export const readCategoryById = async (req:Request, res:Response) => {
    try {
        // Parse id and convert to query
        let id: string = req.params.id;
        let query = { _id: new ObjectId(id) };

        // Read in category
        const category = (await categoryCollection.findOne(query)) as Category;

        res.status(200).json(category);
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
export const updateCategory = async (req:Request, res:Response) => {
    try {
        // Validate updated details
        let validationResult : Joi.ValidationResult = ValidateCategory(req.body);

        if (validationResult.error) {
            res.status(400).json(validationResult.error);
            return;
        }

        // Parse id and convert to query
        let id: string = req.params.id;
        let query = { _id: new ObjectId(id) };

        // Create updated category
        let updateCategory : Category = req.body as Category;

        // Update database
        const result = await categoryCollection.updateOne(query, {$set: updateCategory});

        // Return result of action
        if (result && result.upsertedCount) {
            res.status(202).json({ message: `Successfully updated category with id ${id}` });
        } else if (!result) {
            res.status(400).json({ message: `Failed to update category with id ${id}` });
        } else if (!result.upsertedCount) {
            // res.status(404).json({ message: `no user fround with id ${id}` });
            res.status(202).json({ message: `Updated category ${id}` });
        }
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error updating category:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Delete methods
export const deleteCategory = async (req:Request, res:Response) => {
    try {
        // Parse id and convert to query
        let id: string = req.params.id;
        let query = { _id: new ObjectId(id) };

        // Delete from database
        const result = await categoryCollection.deleteOne(query);

        // Return result of action
        if (result && result.deletedCount) {
            res.status(202).json({ message: `Successfully removed category with id ${id}` });
        } else if (!result) {
            res.status(400).json({ message: `Failed to remove category with id ${id}` });
        } else if (!result.deletedCount) {
            res.status(404).json({ message: `no category fround with id ${id}` });
        }
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error deleting category:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};