const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    skills: [String],
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
