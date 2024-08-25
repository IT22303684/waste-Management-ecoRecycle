import Bank from '../models/BankModel.js'
import { StatusCodes } from 'http-status-codes';



export const createBank = async  (req, res) => {
    console.log("ttttttttt",req.body)
    // req.body.createdBy = req.user.userId;
    const obj = req.body;
  
  console.log(obj);
  const newItem = await Bank.create(obj); 
  console.log("newitem",newItem)
      res.status(StatusCodes.CREATED).json({newItem});
  };