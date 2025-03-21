// Imports
import express, { Router } from "express";
import { createCategory } from "../controllers/category";

// Set up router
const router: Router = express.Router();

// Routes
router.post('/', createCategory);

// Make router accessable
export default router;