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
    experiences: [
        {
            companyName: String,
            title: String,
            location: String,
            description: String,
            start: { year: String },
            end: { year: String },
        },
    ],
    projects: [
        {
            title: String,
            description: String,
            technologies: String,
            links: String,
        },
    ],
    skills : {
        languages: String,
        libraries: String,
        tools: String,
        databases: String,
        others: String,
    },
    achievements: [
        {
            name: String,
        },
    ],
    template: String,
});

module.exports = mongoose.model("Resume", resumeSchema);
