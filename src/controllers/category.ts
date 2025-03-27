// Imports
import { Request, Response } from "express";
import { Category, ValidateCategory } from "../models/category";
import Joi from "joi";
import { categoryCollection } from "../database";
import { Filter, ObjectId } from "mongodb";
import { CategoryStatus } from "../enums/category-status";

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

        newCategory.created = new Date();
        newCategory.status = CategoryStatus.Pending;

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
        let errorMessage: string;

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
export const readCategoriesByUserId = async (req: Request, res: Response) => {
    try {
        // Get user id
        const userId = req.params.id;

        // Set up filters
        let filter: Filter<Category> = {};
        if (userId != null) {
            filter = { "user": `${userId}` }
        }

        // Get categories
        const categories = (await categoryCollection.find(filter).toArray()) as Category[];

        res.status(200).json(categories);
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error fetching transactions:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

export const readAllCategories = async (req: Request, res: Response) => {
    try {
        // Get page
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 0;
        const filter = req.body;

        // Set order
        let sortAscending = req.query.asc == null ? true : req.query.asc;

        // Count documents for the specific user
        let totalDocs = await categoryCollection.countDocuments(filter);

        // Read in all categories
        const categories = (await categoryCollection
            .find(filter)
            .sort(sortAscending ? { name: +1 } : { name: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray()) as Category[];

        res.status(200).json({ categories, totalDocs });
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error fetching transactions:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Update methods
export const approveCategory = async (req: Request, res: Response) => {
    try {
        // Parse id and convert to query
        let id: string = req.params.id;
        // Parse id and convert to query
        let query: Filter<Category> = { _id: new ObjectId(id) as unknown as string };

        // Get category
        const category = await categoryCollection.findOne(query) as Category | null;
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        console.log(category);

        // Update category
        category.status = CategoryStatus.Approved;
        await categoryCollection.updateOne(query, { $set: { status: category.status } });

        res.status(200).json({ message: "Category approved" });
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error approving category:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

export const denyCategory = async (req: Request, res: Response) => {
    try {
        // Parse id and convert to query
        let id: string = req.params.id;
        // Parse id and convert to query
        let query: Filter<Category> = { _id: new ObjectId(id) as unknown as string };

        // Get category
        const category = await categoryCollection.findOne(query) as Category | null;
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        console.log(category);

        // Update category
        category.status = CategoryStatus.Denied;
        await categoryCollection.updateOne(query, { $set: { status: category.status } });

        res.status(200).json({ message: "Category denied" });
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error denying category:\n${error.message}`
        } else {
            errorMessage = `Error: ${error}`
        }

        res.status(400).send(errorMessage);
    }
};

// Delete methods
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        // Parse id and convert to query
        let id: string = req.params.id;
        // Parse id and convert to query
        let query: Filter<Category> = { _id: new ObjectId(id) as unknown as string };
        
        // Delete from database
        console.log("Tried deleting from db")
        const result = await categoryCollection.deleteOne(query);

        console.log(result);

        // Return result of action
        if (result && result.deletedCount) {
            res.status(202).json({ message: `Successfully removed category with id ${id}` });
        } else if (!result) {
            res.status(400).json({ message: `Failed to remove category with id ${id}` });
        } else if (!result.deletedCount) {
            res.status(404).json({ message: `no transaction fround with id ${id}` });
        }
    } catch (error) {
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = `Error deleting category:\n${error.message}`;
        } else {
            errorMessage = `Error: ${error}`;
        }

        res.status(400).send(errorMessage);
    }
};
