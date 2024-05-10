const Job = require('../models/jobModel');
exports.getAllJobs = async (req, res) => {
    try {
        const { query } = req.query;
        let filter = {};

        // If query parameter is provided, perform search
        if (query) {
            // Define the search filter based on your requirements
            filter = {
                $or: [
                    { jobTitle: { $regex: query, $options: 'i' } }, // Case-insensitive search for job title
                    { jobDescription: { $regex: query, $options: 'i' } } // Case-insensitive search for job description
                    // Add more fields for search if needed
                ]
            };
        }

        // Retrieve all jobs from the database based on the filter
        const jobs = await Job.find(filter);

        return res.status(200).json({ jobs });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createJob = async (req, res) => {
    try {
        const {
            jobBannerURL,
            jobTitle,
            loggedInUser,
            jobCategory,
            min_salary,
            max_salary,
            jobDescription,
            applicationDeadline
        } = req.body;

        // Create new job instance
        const newJob = new Job({
            jobBannerURL,
            jobTitle,
            loggedInUser,
            jobCategory,
            min_salary,
            max_salary,
            jobDescription,
            applicationDeadline
        });

        // Save the new job to the database
        await newJob.save();

        return res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        console.error('Error creating job:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        // Retrieve the job from the database by ID
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        return res.status(200).json({ job });
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getJobsByEmail = async (req, res) => {
    try {
        const {email} = req.user;

        // Retrieve jobs from the database by email of the owner
        const jobs = await Job.find({ 'loggedInUser.email': email });

        return res.status(200).json({ jobs });
    } catch (error) {
        console.error('Error fetching jobs by email:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const updateData = req.body;

        // Update the job in the database
        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }

        return res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        // Delete the job from the database
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }

        return res.status(200).json({ message: 'Job deleted successfully', job: deletedJob });
    } catch (error) {
        console.error('Error deleting job:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
