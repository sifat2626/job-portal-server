const express = require('express');
const resumeController = require('../controllers/resumeController');
const {verifyToken} = require("../middlewares/authMiddleware");
const {isUniqueResume} = require("../middlewares/resumeMiddleware");

const router = express.Router();

// Route to submit a resume for a job
router.post('/jobs/apply', verifyToken, isUniqueResume, resumeController.createResume);
router.get('/jobs/apply/:email', verifyToken, resumeController.getAppliedJobs);
router.delete('/jobs/apply/:resumeId', verifyToken, resumeController.deleteResume);

module.exports = router;
