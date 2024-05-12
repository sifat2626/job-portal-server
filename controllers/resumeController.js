const Resume = require('../models/resumeModel');
const Job = require('../models/jobModel');

// Controller function to create a resume
exports.createResume = async (req, res) => {
    try {
        // Extract resume data from the request body
        const { jobId, email, username, resumeURL } = req.body;

        const job = await Job.findById(jobId);
        if(job.loggedInUser.email === email){
            return res.status(400).json({ error: 'You can not apply for your own job' })
        }

        // Create a new resume instance
        const newResume = new Resume({
            jobId,
            email,
            username,
            resumeURL
        });

        // Save the new resume to the database
        await newResume.save();

        // Increase the number of job applicants for the corresponding job
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

exports.getAppliedJobs = async (req, res) => {
    try {
        const { email } = req.params;

        // Find resumes by email
        const resumes = await Resume.find({ email });

        // Extract job IDs from the resumes
        const jobIds = resumes.map(resume => resume.jobId);

        // Find jobs corresponding to the extracted job IDs
        const jobs = await Job.find({ _id: { $in: jobIds } });

        return res.status(200).json({ jobs });
    } catch (error) {
        console.error('Error fetching jobs by email:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



// Controller function to delete a resume
exports.deleteResume = async (req, res) => {
    try {
        const { resumeId } = req.params;

        // Find the resume by ID
        const resume = await Resume.findById(resumeId);

        // Check if the resume exists
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        // Delete the resume from the database
        await resume.remove();

        // Decrease the number of job applicants for the corresponding job
        const job = await Job.findById(resume.jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        job.jobApplicantsNumber -= 1;
        await job.save();

        return res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
