// Imports
import express, { Router } from "express";
import {
    createBudget,
    readBudget,
    updateBudget,
    deleteBudget
} from "./../controllers/budget";

// Set up router
const router: Router = express.Router();

// Routes
router.post('/', createBudget);
router.post('/filtered', readBudget);

router.get('/', readBudget);

router.put('/:id', updateBudget);

router.delete('/:id', deleteBudget);

// Make router available
export default router;