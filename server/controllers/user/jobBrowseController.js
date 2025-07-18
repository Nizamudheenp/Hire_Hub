const JobDB = require('../../models/jobmodel');

exports.getAllJobs = async (req, res) => {
    const { title, location, skills } = req.query;

    let filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (skills) filter.skills = { $in: skills.split(',') };

    const jobs = await JobDB.find(filter).populate('company', 'name email');
    res.json(jobs);
};

exports.getJobById = async (req, res) => {
    const job = await JobDB.findById(req.params.id).populate('company', 'name email');
    res.json(job);
};
