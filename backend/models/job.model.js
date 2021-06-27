const mongoose = require('../connection');

const Schema = mongoose.Schema

const jobSchema = new Schema({
        "name": {
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
        }
    }
);
  
module.exports = mongoose.model("Job", jobSchema);