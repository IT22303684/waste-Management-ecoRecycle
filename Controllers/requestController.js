import RItem from "../models/RItemsModel.js";

// Controller function to retrieve all requests
export const RetriveAllrequest = async (req, res) => {
  try {
    const rItem = await RItem.find();  // Fetch all items from the database
    res.json(rItem);  // Send the fetched data as JSON
  } catch (error) {
    console.error('Retrieve Error:', error);  // Logs the error on the server
    res.status(400).json({ msg: "Route not found", error: error.message });  // Sends error response
  }
};
