import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

const CompanyApplications = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {
        try {
            const res = await api.get(`/company/applications/${jobId}`);
            setApplications(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to load applications');
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const handleStatusChange = async (appId, newStatus) => {
        await api.put(`/company/applications/status/${appId}`, { status: newStatus });
        fetchApplications();
    };

    if (applications.length === 0) {
        return <div className="p-8 text-white">No applications yet.</div>;
    }

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6">Applications for this Job</h2>

            <div className="space-y-4">
                {applications.map((app) => (
                    <div key={app._id} className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">{app.user.name}</h3>
                        <p className="text-gray-400">Email: {app.user.email}</p>
                        <p>Status: <span className="font-bold">{app.status}</span></p>
                        {app.resumeLink ? (
                            <a
                                href={`http://localhost:5000${app.resumeLink}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-400 underline mt-2 inline-block"
                            >
                                View Resume
                            </a>
                        ) : (
                            <p className="text-red-400 mt-2">No resume uploaded</p>
                        )}
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => handleStatusChange(app._id, 'Accepted')}
                                className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleStatusChange(app._id, 'Rejected')}
                                className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyApplications;
