const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    companytype: {
        type: String,
        required: true
    },
    stocklimit: {
        type: String,
        required: true
    }
});

module.exports = Company = mongoose.model("Company", CompanySchema);