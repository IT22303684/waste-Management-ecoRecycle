import { Router } from "express";
import upload from "../middleware/multerMiddleware.js";
 
const router = Router();
 
import { createBank, getBankById, updateBank, deleteBank } from '../Controllers/BankController.js';
console.log("ïnsideeeeeeee")
// Define routes for bank-related operations
router.post('/',createBank);
router.get('/:id', getBankById);
router.put('/:id', updateBank);
router.delete('/:id', deleteBank);
 
export default router;