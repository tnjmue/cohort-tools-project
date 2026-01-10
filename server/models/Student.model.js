const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
// Schema - describes and enforces the structure of the documents
const studentSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    phone: { type: String },
    linkedinUrl: { type: String },
    languages: [{ type: String, enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"] }],
    program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] },
    background: { type: String },
    image: { type: String },
    projects: {
        type: Array,
         cohort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cohort"
        } }
})

const Student = mongoose.model("Student", studentSchema);
module.exports = Student