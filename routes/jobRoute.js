const express = require('express');
const jobController = require('../controllers/jobController');
const {verifyToken} = require("../middlewares/authMiddleware");
const {verify} = require("jsonwebtoken");

const router = express.Router();

// Route to get all jobs
router.get('/jobs', jobController.getAllJobs);
// Route to get a job by ID
router.get('/jobs/:jobId',verifyToken, jobController.getJobById);
// Route to create a new job
router.post('/jobs',verifyToken, jobController.createJob);
// Route to update job
router.patch('/jobs/:jobId',verifyToken, jobController.updateJob);
// Route to delete a job
router.delete('/jobs/:jobId',verifyToken, jobController.deleteJob);
// Route to get jobs by email
router.get('/jobs/email/:email',verifyToken, jobController.getJobsByEmail);

module.exports = router;
