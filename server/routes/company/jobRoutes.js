const express = require('express');
const {createJob,getMyJobs,updateJob,deleteJob} = require('../../controllers/company/jobController');
const { authMiddleware, companyOnly } = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, companyOnly, createJob);
router.get('/my', authMiddleware, companyOnly, getMyJobs);
router.put('/:id', authMiddleware, companyOnly, updateJob);
router.delete('/:id', authMiddleware, companyOnly, deleteJob);

module.exports = router;
