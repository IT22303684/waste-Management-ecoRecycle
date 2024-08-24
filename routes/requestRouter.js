import { Router } from "express";
import { RetriveAllrequest } from "../Controllers/requestController.js";

const router = Router();

// Route to handle the GET request for retrieving all requests
router.get('/retriveRequest', RetriveAllrequest);

export default router;
