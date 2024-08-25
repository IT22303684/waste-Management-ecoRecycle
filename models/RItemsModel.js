import mongoose from "mongoose";
import {RITEM_CATEGORY , RITEM_STATUS} from "../Utils/constants.js";

const recyclableItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: Object.values(RITEM_CATEGORY),
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    Location : {
        type: String,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        enum: Object.values(RITEM_STATUS),
        default: 'Pending',
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    isSold: {
        type: Boolean,
        default: false,
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    createdBy : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    itemPhoto: String,
    itemPhotoPublicId: String,
} , {timestamps: true});



export default mongoose.model('RItem', recyclableItemSchema);