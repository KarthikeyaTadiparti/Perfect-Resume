const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    mobile : String,
    updated_at : Date,
    name : String,
});

module.exports = mongoose.model("Resume",resumeSchema);