const express = require('express');
const { authMiddleware, companyOnly } = require('../../middleware/authMiddleware');
const { getJobApplications, updateApplicationStatus } = require('../../controllers/company/companyApplication');
const router = express.Router();

router.get('/:jobId', authMiddleware, companyOnly, getJobApplications);
router.put('/status/:applicationId', authMiddleware, companyOnly, updateApplicationStatus);

module.exports = router;
