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

// Controller function to update specific requests
export const UpdateRequestStatus = async (req, res) => {
  try {
    const updateRequestStatus = await RItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateRequestStatus) {
      return res.status(404).json({ msg: "Request not found" });
    }

    res.json({ msg: "Update successfully", data: updateRequestStatus });
  } catch (error) {
    console.error('Update request Error:', error.message);
    res.status(400).json({ msg: "Update request Error", error: error.message });
  }
};

// Controller function to retrieve a specific request
export const GetRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const rItem = await RItem.findById(id);
    if (!rItem) {
      return res
        .status(404)
        .json({ message: "Request not found" });
    }
    res.status(200).json(rItem);
  } catch (error) {
    console.error('Retrieve Error:', error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the request" });
  }
};

