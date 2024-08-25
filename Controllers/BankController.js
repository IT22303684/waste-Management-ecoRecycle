import Bank from "../models/BankModel.js";
import { StatusCodes } from "http-status-codes";
 
export const createBank = async  (req, res) => {
    const obj = req.body;
 
  console.log(obj);
  const newItem = await Bank.create(obj);
  console.log("newitem",newItem)
      res.status(StatusCodes.CREATED).json({newItem});
  };
 
// Controller to get a bank record by User_ID
export const getBankById = async (req, res) => {
  try {
    const { id } = req.params;
    const bankRecord = await Bank.findById(id);
    if (!bankRecord) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Bank record not found" });
    }
    res.status(StatusCodes.OK).json(bankRecord);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while retrieving the bank record" });
  }
};
 
// Controller to update a bank record by _id
export const updateBank = async (req, res) => {
  try {
    const { id } = req.params; // Extracting the _id from the request parameters
    const bankRecord = await Bank.findByIdAndUpdate(id, req.body, {
      new: true,
    }); // Updating the bank record
 
    if (!bankRecord) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Bank record not found" });
    }
 
    res.status(StatusCodes.OK).json(bankRecord);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while updating the bank record" });
  }
};
 
// Controller to delete a bank record by _id
export const deleteBank = async (req, res) => {
  try {
    const { id } = req.params;
    const bankRecord = await Bank.findByIdAndDelete(id);
    if (!bankRecord) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Bank record not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Bank record deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while deleting the bank record" });
  }
};
 