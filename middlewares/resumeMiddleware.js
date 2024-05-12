const Resume = require('../models/resumeModel');
exports.isUniqueResume = async (req, res, next) => {
    const { jobId, email } = req.body;
    const existingResume = await Resume.findOne({ jobId, email });
    if (existingResume) {
        return res.status(409).json({ error: 'You have already applied for this job' }); // Conflict (409) for duplicate
    }
    next();
};