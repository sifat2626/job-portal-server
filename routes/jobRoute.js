const express = require('express');
const jobController = require('../controllers/jobController');
const {verifyToken} = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to get all jobs
router.get('/jobs', jobController.getAllJobs);
// Route to get a job by ID
router.get('/jobs/:jobId', jobController.getJobById);
// Route to create a new job
router.post('/jobs',verifyToken, jobController.createJob);

module.exports = router;
