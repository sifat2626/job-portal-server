const Resume = require('../models/resumeModel');
const Job = require('../models/jobModel');

// Controller function to create a resume
exports.createResume = async (req, res) => {
    try {
        // Extract resume data from the request body
        const { email, username, resumeURL } = req.body;
        console.log(req.body)


        // Create a new resume instance
        const newResume = new Resume({
            email,
            username,
            resumeURL
        });

        // Save the new resume to the database
        await newResume.save();

        // Increase the number of job applicants for the corresponding job
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        job.jobApplicantsNumber += 1;
        await job.save();

        return res.status(201).json({ message: 'Resume submitted successfully', resume: newResume });
    } catch (error) {
        console.error('Error creating resume:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
