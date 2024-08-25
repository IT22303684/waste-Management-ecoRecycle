import { body ,param, validationResult} from 'express-validator';
import { BadRequestError  , NotFoundError, UnauthorizedError} from '../errors/customErrors.js';
import {RITEM_CATEGORY , RITEM_STATUS} from "../Utils/constants.js";
import User from '../models/UserModel.js';
import RItem from '../models/RItemsModel.js'
import Company from '../models/CompanyModel.js';

import mongoose, { mongo } from 'mongoose';


const withValidationError = (validateValue) => {
    return [validateValue , 
        (req, res , next ) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const errorMessage = errors.array().map(error => error.msg);
            if(errorMessage[0].startsWith('Recycle item with')) {
                throw new NotFoundError(errorMessage);
            }

            if(errorMessage[0].startsWith('not authorized')){
                throw new UnauthorizedError('not authorized to access this route');
            }
            
            throw new BadRequestError(errorMessage);
        }
        next();
    }];
};






export const validateRItem = withValidationError([
    body('name').notEmpty().withMessage('Name is required'),
    body('category').isIn(Object.values(RITEM_CATEGORY)).withMessage('Item Type is invalid'),
    body('description').notEmpty().withMessage('description is required'),
    body('Location').notEmpty().withMessage('Location is required'),
    body('status').isIn(Object.values(RITEM_STATUS)).withMessage('Item Status is invalid'),
   
]);

export const validateCompany = withValidationError([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format'),
    body('phone').notEmpty().withMessage('phone is required'),
    body('address').notEmpty().withMessage('address is required'),
    body('companytype').notEmpty().withMessage('companytype is required'),
    body('stocklimit').notEmpty().withMessage('stocklimit is required'),
   
]);


export const validateComapnyIDParam = withValidationError([
    param('id')
    .custom(async (value , {req}) => {
        const isValid = mongoose.Types.ObjectId.isValid(value);

        if(!isValid) throw new BadRequestError('Invalid MongoDB id');

        const company = await Company.findById(value);
   

     if(!company) throw new NotFoundError(`Company with id ${value} not found`);
     const isAdmin = req.user.role === 'admin';
     const isOwner = req.user.userId === company.createdBy.toString();

     if(!isAdmin && !isOwner){
        throw new UnauthorizedError('not authorized to access this route');
     }

    }
)
    
]);


export const validateRIdParam = withValidationError([
    param('id')
    .custom(async (value , {req}) => {
        const isValid = mongoose.Types.ObjectId.isValid(value);

        if(!isValid) throw new BadRequestError('Invalid MongoDB id');

        const ritem = await RItem.findById(value);
   

     if(!ritem) throw new NotFoundError(`Recycle item with id ${value} not found`);
     const isAdmin = req.user.role === 'admin';
     const isOwner = req.user.userId === ritem.createdBy.toString();

     if(!isAdmin && !isOwner){
        throw new UnauthorizedError('not authorized to access this route');
     }

    }
)
    
]);



export const validateRegisterInput = withValidationError([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email) =>{
            const user = await User.findOne({email})
            if(user) {
                throw new BadRequestError('email already exists');
            }
    } ),
    body('password').notEmpty().withMessage('password is required').isLength({min: 6}).withMessage('password must be atleast 6 characters long'),
    body('location').notEmpty().withMessage('location is required'),
])


export const validateLoginInput = withValidationError([
   
    body('email').notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
   
])


export const validateUpdateUserInput = withValidationError([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email format').custom(async (email , {req}) =>{
            const user = await User.findOne({email})
            if(user && user._id.toString() !== req.user.userId) {
                throw new BadRequestError('email already exists');
            }
    } ),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('lastName is required'),
])
