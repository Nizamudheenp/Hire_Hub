import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'sonner';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/user/jobs/${id}`);
                setJob(res.data);
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to load job');
            } finally {
                setLoading(false);
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
            toast.warning('Please upload your resume');
            return;
        }

        const formData = new FormData();
        formData.append('resume', resume);

        try {
            await api.post(`/user/applications/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Application submitted!');
            navigate('/user/applications');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Application failed');
        }
    };

    if (loading) return <div className="p-8 text-gray-500">Loading...</div>;

    if (!job) return <div className="p-8 text-red-500">Job not found.</div>;

    return (
        <div className="mt-24 p-8 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">{job.title}</h2>
                <p className="text-gray-500 mb-2"><strong>Company:</strong> {job.company.name}</p>
                <p className="text-gray-500 mb-2"><strong>Location:</strong> {job.location}</p>

                <div className="flex flex-wrap gap-2 my-4">
                    {job.skills.map((skill, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200">
                            {skill}
                        </span>
                    ))}
                </div>

                <p className="text-gray-700 mb-6">{job.description}</p>

                <form onSubmit={handleApply} className="space-y-4">
                    <label className="block text-gray-600 text-sm mb-1">Upload your resume</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-500 transition">
                        Apply Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobDetails;
