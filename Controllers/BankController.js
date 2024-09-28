import Bank from "../models/BankModel.js";
import { StatusCodes } from "http-status-codes";
 
export const createBank = async  (req, res) => {
    const obj = req.body;
    console.log("iddddddddd",req.body)

  const { 'userId':  User_ID,'Account Number': Account_Number, 'Account Name': Account_Name, 'Bank Name': Bank_Name, 'Branch Code': Branch_Code } = req.body;

const bankData = {
  User_ID,
 Account_Number,
  Account_Name,
  Bank_Name,
  Branch_Code,
};
  const newItem = await Bank.create(bankData);
  console.log("newitem",newItem)
      res.status(StatusCodes.CREATED).json({newItem});
  };
 
// Controller to get a bank record by User_ID
export const getBankById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("getttttt",req.params)
    const bankRecord = await Bank.findOne(id);
    console.log("bank details", bankRecord)
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
    console.log("req.params  ", req.params)
    console.log("req.body  ", req.body) 
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
    const { id } = req.params.id;
    const bankRecord = await Bank.findByIdAndDelete(req.params.id);
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
 