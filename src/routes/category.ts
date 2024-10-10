// Imports
import express, { Router } from "express";
import {
    createCategory,
    readCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category";

// Routes
const router: Router = express.Router();

router.post('/', createCategory);
router.get('/', readCategory);
router.put('/', updateCategory);
router.delete('/', deleteCategory);

export default router;