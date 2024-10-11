// Imports
import express, { Router } from "express";
import {
    createCategory,
    readCategory,
    readCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/category";

// Set up router
const router: Router = express.Router();

// Routes
router.post('/', createCategory);

router.get('/', readCategory);
router.get('/:id', readCategoryById);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

// Make router available
export default router;