// Imports
import express, { Router } from "express";
import { createCategory, readAllCategories, readCategoriesByUserId } from "../controllers/category";

// Set up router
const router: Router = express.Router();

// Routes
router.post('/', createCategory);
router.post('/filtered', readAllCategories);

router.get('/:id', readCategoriesByUserId);

// Make router accessable
export default router;