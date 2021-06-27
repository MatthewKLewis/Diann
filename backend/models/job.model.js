const mongoose = require('../connection');

const Schema = mongoose.Schema

const jobSchema = new Schema({
        "name": {
            type: String,
            required: true
        },
        "userId": {
            type: String
        }
    }
);
  
module.exports = mongoose.model("Job", jobSchema);