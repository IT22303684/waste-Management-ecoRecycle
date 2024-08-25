import { Router } from "express";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

import { createBank } from '../Controllers/BankController.js';
console.log("ïnsideeeeeeee")
// Define routes for bank-related operations
router.post('/',createBank); // Route for creating a new bank object
console.log("name")
// Additional routes for bank operations (e.g., get, patch, delete) can be added here if needed

export default router;