// Imports
import express, { Router } from "express";
import { approveCategory, createCategory, deleteCategory, denyCategory, readAllCategories, readCategoriesByUserId } from "../controllers/category";

// Set up router
const router: Router = express.Router();

// Routes
router.post('/', createCategory);
router.post('/filtered', readAllCategories);

router.get('/:id', readCategoriesByUserId);

router.put('/approve/:id', approveCategory);
router.put('/deny/:id', denyCategory);

router.delete('/:id', deleteCategory);

// Make router accessable
export default router;