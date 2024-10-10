// Imports
import { Request, Response } from "express";

// Create methods
export const createCategory = (req:Request, res:Response) => {
    res.json({"alert":"createCategory"});
};

// Read methods
export const readCategory = (req:Request, res:Response) => {
    res.json({"alert":"readCategory"})
};

// Update methods
export const updateCategory = (req:Request, res:Response) => {
    res.json({"alert":"updateCategory"})
};

// Delete methods
export const deleteCategory = (req:Request, res:Response) => {
    res.json({"alert":"deleteCategory"})
};