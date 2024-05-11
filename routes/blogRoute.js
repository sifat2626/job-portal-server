const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Route to create a new blog
router.post('/blogs', blogController.createBlog);

// Route to get all blogs
router.get('/blogs', blogController.getAllBlogs);

// Route to get a blog by ID
router.get('/blogs/:blogId', blogController.getBlogById);

module.exports = router;