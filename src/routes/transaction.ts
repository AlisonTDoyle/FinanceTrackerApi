// Imports
import express, { Router } from "express";
import { 
    createTransaction,
    readTransaction,
    updateTransaction
 } from "../controllers/transactions";

// Set up router
const router: Router = express.Router();

// Routes
router.post('/', createTransaction);

router.get('/', readTransaction);

router.put('/:id', updateTransaction)

// Make router accessable
export default router;