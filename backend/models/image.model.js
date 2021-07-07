const mongoose = require('../connection');
const Schema = mongoose.Schema
const imageSchema = new Schema({
        "name": {
            type: String,
            required: true
        },
        "desc": {
            type: String,
            required: true
        },
        "date": {
            type: Date,
            required: true
        },
        "userId": {
            type: String,
            required: true
        },
        "img":
            {
                data: Buffer,
                contentType: String
            }
    }
);
module.exports = mongoose.model("Image", imageSchema);