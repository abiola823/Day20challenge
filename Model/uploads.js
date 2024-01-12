const mongoose = require("mongoose");
const uploadSchema = new mongoose.Schema({
        pictureName: {
            type: String,
            required: true
        },
        path: String
}, {timestamps: true})

const uploadCollection = mongoose.model("upload", uploadSchema);
module.exports = { 
    uploadCollection
};