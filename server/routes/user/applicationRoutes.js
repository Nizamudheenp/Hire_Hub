const express = require('express');
const { applyToJob, getMyApplications } = require('../../controllers/user/applicationController');
const { authMiddleware, userOnly } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/:jobId', authMiddleware, userOnly, applyToJob);
router.get('/my', authMiddleware, userOnly, getMyApplications);

module.exports = router;
