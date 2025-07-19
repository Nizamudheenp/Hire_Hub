const ApplicationDB = require('../../models/applicationmodel');
const JobDB = require('../../models/jobmodel');

exports.getJobApplications = async (req, res) => {
    const jobId = req.params.jobId;

    const job = await JobDB.findById(jobId);

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    if (job.company.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const applications = await ApplicationDB.find({ job: jobId }).populate('user', 'name email').select('-__v');;

    res.json(applications);

};

exports.updateApplicationStatus = async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await ApplicationDB.findByIdAndUpdate(applicationId, { status }, { new: true });
    res.json({ message: 'Status updated', application });
};
