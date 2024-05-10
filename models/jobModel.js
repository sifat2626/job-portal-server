const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobBannerURL: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    loggedInUser: {
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    jobCategory: {
        type: String,
        enum: ['On Site', 'Remote', 'Part-Time', 'Hybrid'],
        required: true
    },
    min_salary: {
        type: Number,
        required: true
    },
    max_salary: {
        type: Number,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobPostingDate: {
        type: Date,
        default: Date.now
    },
    applicationDeadline: {
        type: Date,
        required: true
    },
    jobApplicantsNumber: {
        type: Number,
        default: 0
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
