const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    resumeURL: {
        type: String,
    },
}, {
    timestamps: true,
    unique: true, // Add unique constraint
    compoundIndexes: [
        { key: { jobId: 1, email: 1 }, unique: true }, // Unique for jobId and email combination
    ],
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
