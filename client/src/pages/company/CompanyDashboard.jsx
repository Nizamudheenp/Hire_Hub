import { Dialog } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const CompanyDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        skills: ''
    });

    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchJobs = async () => {
        const res = await api.get('/company/jobs/my');
        setJobs(res.data);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/company/jobs/', formData);
        setFormData({ title: '', description: '', location: '', salary: '', skills: '' });
        fetchJobs();
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this job?')) {
            await api.delete(`/company/jobs/${id}`);
            fetchJobs();
        }
    };

    const openEditModal = (job) => {
        setEditData(job);
        setIsOpen(true);
    };

    const handleEditSave = async () => {
        await api.put(`/company/jobs/${editData._id}`, editData);
        setIsOpen(false);
        fetchJobs();
    };

    return (
        <div className="p-8 text-white bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>

            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mb-8 space-y-4">
                <h2 className="text-2xl mb-4">Post New Job</h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700"
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700"
                    required
                />
                <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700"
                />
                <input
                    type="text"
                    name="skills"
                    placeholder="Required Skills (comma separated)"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full p-2 rounded bg-gray-700"
                    required
                />

                <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-500">
                    Post Job
                </button>
            </form>

            {/* List of Jobs */}
            <h2 className="text-2xl mb-4">My Jobs</h2>
            <div className="space-y-4">
                {jobs.length === 0 ? (
                    <p>No jobs posted yet.</p>
                ) : (
                    jobs.map((job) => (
                        <div key={job._id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold">{job.title}</h3>
                                <p className="text-gray-400">{job.location} | ₹{job.salary}</p>
                                <p className="text-gray-400">Skills: {job.skills}</p>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => openEditModal(job)} className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-500">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(job._id)} className="bg-red-600 px-3 py-1 rounded hover:bg-red-500">
                                    Delete
                                </button>
                                <Link
                                    to={`/company/applications/${job._id}`}
                                    className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                                >
                                    View Applications
                                </Link>

                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit  */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} as={Fragment}>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Dialog.Panel className="bg-gray-800 p-6 rounded-lg w-96">
                        <Dialog.Title className="text-xl font-bold mb-4">Edit Job</Dialog.Title>

                        <input
                            type="text"
                            value={editData?.title || ''}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                            className="w-full p-2 rounded bg-gray-700 mb-2"
                        />
                        <textarea
                            value={editData?.description || ''}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            className="w-full p-2 rounded bg-gray-700 mb-2"
                        />
                        <input
                            type="text"
                            value={editData?.location || ''}
                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                            className="w-full p-2 rounded bg-gray-700 mb-2"
                        />
                        <input
                            type="text"
                            value={editData?.salary || ''}
                            onChange={(e) => setEditData({ ...editData, salary: e.target.value })}
                            className="w-full p-2 rounded bg-gray-700 mb-2"
                        />
                        <input
                            type="text"
                            value={editData?.skills || ''}
                            onChange={(e) => setEditData({ ...editData, skills: e.target.value })}
                            className="w-full p-2 rounded bg-gray-700 mb-4"
                        />

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsOpen(false)} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500">
                                Cancel
                            </button>
                            <button onClick={handleEditSave} className="bg-green-600 px-4 py-2 rounded hover:bg-green-500">
                                Save
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default CompanyDashboard;
