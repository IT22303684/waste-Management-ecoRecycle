import { Router } from "express";
import { InsertVehicle, RetriveAllVehicle } from "../Controllers/vehicleController.js";

const router = Router();

router.post('/addVehicle', InsertVehicle);
router.get('/retrivevehicles', RetriveAllVehicle);


export default router;