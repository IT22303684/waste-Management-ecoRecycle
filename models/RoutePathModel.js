import mongoose from 'mongoose';

const RoutePathSchema = new mongoose.Schema({
    RouteId: {
        type: String,
        required: false,
    },
    RequestId: {
        type: String,
        required: false,
    },
    CustomerName: {
        type: String,
        required: false,
    },
    ContactNumber: {
        type: String,
        required: false,
    },
    PickupPath: {
        type: String,
        required: false,
    },
    ArriveTime: {
        type: String,
        required: false,
    },
    ArriveDate: {
        type: String,
        required: false,
    },
    Vehicle: {
        type: String,
        required: false,
    },
    Status: {
        type: String,
        required: false,
    },
});

const RoutePath = mongoose.model("RoutePath", RoutePathSchema);
export default RoutePath; 
