const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    geo: {
        city: String,
        country: String,
    },
    headline: String,
    educations: [
        {
            start: { year: String },
            end: { year: String },
            fieldOfStudy: String,
            degree: String,
            grade: String,
            schoolName: String,
        },
    ],
    certifications: [
        {
            name: String,
            authority: String,
        },
    ],
    name: String,
    updated_at: Date,
});

module.exports = mongoose.model("Resume", resumeSchema);
