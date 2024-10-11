// Imports
import express, { Router } from "express";
import { 
    createUser,
    readUserById,
    updateUser,
    deleteUser
 } from "../controllers/users";

// Set up router
const router: Router = express.Router();

// Routes
router.post('/', createUser);

router.get('/:id', readUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

// Make router available
export default router;