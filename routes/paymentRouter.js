import { Router } from "express";
import { createPayment } from '../Controllers/paymentController.js';

const router = Router();

//Route
router.post('/', createPayment);

export default router;