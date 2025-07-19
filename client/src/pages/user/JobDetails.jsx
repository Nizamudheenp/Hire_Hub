import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [resume, setResume] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/user/jobs/${id}`);
                setJob(res.data);
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to load job');
            }
        };

        fetchJob();
    }, [id]);

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleApply = async (e) => {
        e.preventDefault();

        if (!resume) {
            alert('Please upload a resume');
            return;
        }

        const formData = new FormData();
        formData.append('resume', resume);

        try {
            await api.post(`/user/applications/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert('Application submitted!');
            navigate('/user/applications');
        } catch (err) {
            alert(err.response?.data?.message || 'Application failed');
        }
    };

    if (!job) return <div className="text-white p-8">Loading...</div>;

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
            <p className="text-gray-400 mb-2">Company: {job.company.name}</p>
            <p className="text-gray-400 mb-2">Location: {job.location}</p>
            <p className="text-gray-400 mb-2">Skills: {job.skills.join(', ')}</p>
            <p className="mb-4">{job.description}</p>

            <form onSubmit={handleApply} className="bg-gray-800 p-4 rounded-lg space-y-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full p-2 rounded bg-gray-700"
                    required
                />
                <button type="submit" className="w-full p-2 bg-green-600 rounded hover:bg-green-500">
                    Apply Now
                </button>
            </form>
        </div>
    );
};

export default JobDetails;
