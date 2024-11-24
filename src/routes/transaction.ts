// Imports
import express, { Router } from "express";
import { 
    createTransaction,
    deleteTransaction,
    readTransaction,
    updateTransaction
 } from "../controllers/transactions";

// Set up router
const router: Router = express.Router();

// Routes
router.post('/', createTransaction);
router.post('/filtered', readTransaction);

router.get('/', readTransaction);

router.put('/:id', updateTransaction);

router.delete('/:id', deleteTransaction);

// Make router accessable
export default router;