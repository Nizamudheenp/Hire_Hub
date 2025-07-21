import { Dialog } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

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
        try {
            const res = await api.get('/company/jobs/my');
            setJobs(res.data);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load jobs');
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/company/jobs/', formData);
            toast.success('Job posted successfully');
            setFormData({ title: '', description: '', location: '', salary: '', skills: '' });
            fetchJobs();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to post job');
        }
    };

    const handleDelete = async (id) => {
        toast.promise(
            api.delete(`/company/jobs/${id}`).then(fetchJobs),
            {
                loading: 'Deleting...',
                success: 'Job deleted!',
                error: 'Failed to delete job'
            }
        );
    };

    const openEditModal = (job) => {
        setEditData(job);
        setIsOpen(true);
    };

    const handleEditSave = async () => {
        try {
            await api.put(`/company/jobs/${editData._id}`, editData);
            toast.success('Job updated successfully');
            setIsOpen(false);
            fetchJobs();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update job');
        }
    };

    return (
        <div className="mt-24 p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Company Dashboard</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow space-y-4 mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Post New Job</h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border rounded-md"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border rounded-md"
                    required
                />
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-3 border rounded-md"
                        required
                    />
                    <input
                        type="text"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        className="w-full p-3 border rounded-md"
                    />
                </div>
                <input
                    type="text"
                    name="skills"
                    placeholder="Required Skills (comma separated)"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full p-3 border rounded-md"
                    required
                />

                <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-500 transition">
                    Post Job
                </button>
            </form>

            {/* List of Jobs */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">My Jobs</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.length === 0 ? (
                    <p className="text-gray-500">No jobs posted yet.</p>
                ) : (
                    jobs.map((job) => (
                        <div key={job._id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
                                <p className="text-gray-500 mb-1">{job.location} | ₹{job.salary}</p>
                                <p className="text-gray-500 mb-3">Skills: {job.skills}</p>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                <button onClick={() => openEditModal(job)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400 text-sm">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(job._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 text-sm">
                                    Delete
                                </button>
                                <Link
                                    to={`/company/applications/${job._id}`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 text-sm"
                                >
                                    View Applications
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit Modal */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} as={Fragment}>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Dialog.Panel className="bg-white p-6 rounded-xl w-96 shadow-xl">
                        <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">Edit Job</Dialog.Title>

                        <input
                            type="text"
                            value={editData?.title || ''}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                            className="w-full p-3 border rounded-md mb-3"
                        />
                        <textarea
                            value={editData?.description || ''}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            className="w-full p-3 border rounded-md mb-3"
                        />
                        <input
                            type="text"
                            value={editData?.location || ''}
                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                            className="w-full p-3 border rounded-md mb-3"
                        />
                        <input
                            type="text"
                            value={editData?.salary || ''}
                            onChange={(e) => setEditData({ ...editData, salary: e.target.value })}
                            className="w-full p-3 border rounded-md mb-3"
                        />
                        <input
                            type="text"
                            value={editData?.skills || ''}
                            onChange={(e) => setEditData({ ...editData, skills: e.target.value })}
                            className="w-full p-3 border rounded-md mb-5"
                        />

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setIsOpen(false)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 text-gray-700">
                                Cancel
                            </button>
                            <button onClick={handleEditSave} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">
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
