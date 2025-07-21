import { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const UserJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({ title: '', location: '', skills: '' });

    const fetchJobs = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await api.get(`/user/jobs?${query}`);
            setJobs(res.data);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch jobs');
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const { title, location, skills } = filters;
        if (!title.trim() && !location.trim() && !skills.trim()) {
            toast.warning('Please enter at least one filter');
            return;
        }

        fetchJobs();
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">Discover Jobs</h2>

            <form onSubmit={handleSearch} className="mb-10 flex flex-wrap gap-4 justify-center">
                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={filters.title}
                    onChange={handleChange}
                    className="p-3 w-60 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={filters.location}
                    onChange={handleChange}
                    className="p-3 w-60 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="text"
                    name="skills"
                    placeholder="Skills (comma separated)"
                    value={filters.skills}
                    onChange={handleChange}
                    className="p-3 w-60 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button type="submit" className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition">
                    Search
                </button>
            </form>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map(job => (
                    <div key={job._id} className="bg-white p-5 rounded-xl border hover:shadow-md transition cursor-pointer">
                        <h3 className="text-lg font-medium text-gray-800 mb-1">{job.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">{job.company?.name} - {job.location}</p>

                        <div className="flex flex-wrap gap-2 mb-4 mt-3">
                            {job.skills.slice(0, 5).map((skill, i) => (
                                <span key={i} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <Link
                            to={`/user/jobs/${job._id}`}
                            className="inline-block text-green-600 text-sm font-medium hover:underline"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserJobs;
