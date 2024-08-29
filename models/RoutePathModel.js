import mongoose from 'mongoose';

const RoutePathSchema = new mongoose.Schema({
    RequestId: {
        type: String,
        required: true,
    },
    CustomerId: {
        type: String,
        required: true,
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
        default: 'Scheduled'
    },
});

const RoutePath = mongoose.model("RoutePath", RoutePathSchema);
export default RoutePath; 
