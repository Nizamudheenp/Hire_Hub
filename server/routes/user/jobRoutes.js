const express = require('express');
const { getAllJobs, getJobById } = require('../../controllers/user/jobBrowseController');
const { authMiddleware, userOnly } = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware,userOnly , getAllJobs);
router.get('/:id', authMiddleware, userOnly, getJobById);

module.exports = router;
