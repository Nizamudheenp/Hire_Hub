import { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const UserJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({ title: '', location: '', skills: '' });

    const fetchJobs = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await api.get(`/user/jobs?${query}`);
            setJobs(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to fetch jobs');
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
        fetchJobs();
    };

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Browse Jobs</h2>

            <form onSubmit={handleSearch} className="mb-6 flex flex-wrap gap-4 justify-center">
                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={filters.title}
                    onChange={handleChange}
                    className="p-2 rounded bg-gray-700"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={filters.location}
                    onChange={handleChange}
                    className="p-2 rounded bg-gray-700"
                />
                <input
                    type="text"
                    name="skills"
                    placeholder="Skills (comma separated)"
                    value={filters.skills}
                    onChange={handleChange}
                    className="p-2 rounded bg-gray-700"
                />
                <button type="submit" className="p-2 bg-blue-600 rounded hover:bg-blue-500">Search</button>
            </form>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map(job => (
                    <div key={job._id} className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-gray-400">Company: {job.company?.name}</p>
                        <p className="text-gray-400">Location: {job.location}</p>
                        <p className="text-gray-400">Skills: {job.skills.join(', ')}</p>

                        <Link to={`/user/jobs/${job._id}`} className="mt-4 inline-block bg-green-600 p-2 rounded hover:bg-green-500">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};



export default UserJobs;
