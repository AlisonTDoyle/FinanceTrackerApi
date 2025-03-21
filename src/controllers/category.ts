// Imports
import { Request, Response } from "express";
import { Category, ValidateCategory } from "../models/category";
import Joi from "joi";
import { categoryCollection } from "../database";

// Properties

// Create methods
export const createCategory = async (req: Request, res: Response) => {
    try {
        console.log("Creating new category")

        // Validate category to be entered
        let validationResult: Joi.ValidationResult = ValidateCategory(req.body);

        if (validationResult.error) {
            console.log("Validation failed: " + validationResult.error)
            res.status(400).json(validationResult.error);
            return;
        }

        console.log("Validation passed")
        // Create category
        let newCategory: Category = req.body as Category;

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
        let errorMessage:string;

        // Select error message
        if (error instanceof Error) {
            errorMessage = `Error creating category:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        // Return error to client
        res.status(400).send(errorMessage);
    }
};

// Read methods

// Update methods

// Delete methods