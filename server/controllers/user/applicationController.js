const ApplicationDB = require('../../models/applicationmodel');

exports.applyToJob = async (req, res) => {
    const {  resumeLink } = req.body;
    const jobId = req.params.jobId;

    const application = await ApplicationDB.create({
        user: req.user._id,
        job: jobId,
        resumeLink,
    });

    res.status(201).json({ message: 'Applied successfully', application });
};

exports.getMyApplications = async (req, res) => {
    const applications = await ApplicationDB.find({ user: req.user._id }).populate('job');
    res.json(applications);
};
