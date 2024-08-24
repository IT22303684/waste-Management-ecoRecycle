import Vehicle from "../models/VehicleModel.js";

export const InsertVehicle = async (req, res) => {
    console.log('Request Body:', req.body); 
    try {
        await Vehicle.create(req.body);
        res.json({ msg: "Vehicle added successfully" });
    } catch (error) {
        console.error('Insert Error:', error);
        res.status(400).json({ msg: "Insert failed", error: error.message });
    }
}

export const RetriveAllVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.find();
        res.json(vehicle);
    } catch (error) {
        console.error('Retrieve Error:', error);
        res.status(400).json({ msg: "Route not found", error: error.message });
    }
}
