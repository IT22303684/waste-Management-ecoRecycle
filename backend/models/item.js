const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    limit: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = Item = mongoose.model("Item", ItemSchema);