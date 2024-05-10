const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    resumeURL: {
        type: String,
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
