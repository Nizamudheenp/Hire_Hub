const JobDB = require('../../models/jobmodel');

exports.createJob = async (req, res) => {
    const job = await JobDB.create({ ...req.body, company: req.user._id });
    res.status(201).json({ message: 'Job created', job });
};

exports.getMyJobs = async (req, res) => {
    const jobs = await JobDB.find({ company: req.user._id });
    res.json(jobs);
};

exports.updateJob = async (req, res) => {
    const job = await JobDB.findById(req.params.id);
    if (!job || job.company.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    const updated = await JobDB.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.deleteJob = async (req, res) => {
    const job = await JobDB.findById(req.params.id);
    if (!job || job.company.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    await job.deleteOne();
    res.json({ message: 'Job deleted' });
};
