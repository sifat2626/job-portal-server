const express = require('express');
const resumeController = require('../controllers/resumeController');
const {verifyToken} = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to submit a resume for a job
router.post('/jobs/apply', verifyToken, resumeController.createResume);
router.get('/jobs/apply/:email', verifyToken, resumeController.getAppliedJobs);

module.exports = router;
