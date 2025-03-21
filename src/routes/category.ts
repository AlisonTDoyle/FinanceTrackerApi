// Imports
import express, { Router } from "express";
import { createCategory, readCategories } from "../controllers/category";

// Set up router
const router: Router = express.Router();

// Routes
router.post('/', createCategory);

router.get('/:id', readCategories);

// Make router accessable
export default router;