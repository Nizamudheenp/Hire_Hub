const ApplicationDB = require('../../models/applicationmodel');

exports.applyToJob = async (req, res) => {
    const jobId = req.params.jobId;

    const existingApplication = await ApplicationDB.findOne({
        user: req.user._id,
        job: jobId
    });

    if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied to this job.' });
    }

    let resumeLink = null;
    if (req.file) {
        resumeLink = `/uploads/resumes/${req.file.filename}`;
    }

    const application = await ApplicationDB.create({
        user: req.user._id,
        job: jobId,
        resumeLink,
        status: 'Pending'
    });

    res.status(201).json({ message: 'Applied successfully', application });
};

exports.getMyApplications = async (req, res) => {
    const applications = await ApplicationDB.find({ user: req.user._id }).populate('job');
    res.json(applications);
};
