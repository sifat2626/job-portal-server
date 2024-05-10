const Job = require('../models/jobModel');
exports.getAllJobs = async (req, res) => {
    try {
        // Retrieve all jobs from the database
        const jobs = await Job.find();

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

