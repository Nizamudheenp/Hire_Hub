import { useEffect, useState } from 'react';
import api from '../../api/api';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get('/user/applications/my');
                setApplications(res.data);
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to load applications');
            }
        };

        fetchApplications();
    }, []);

    if (applications.length === 0) {
        return <div className="p-8 text-white">You have not applied to any jobs yet.</div>;
    }

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6">My Applications</h2>
            <div className="space-y-4">
                {applications.map((app) => (
                    <div key={app._id} className="bg-gray-800 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold">{app.job.title}</h3>
                        <p className="text-gray-400">Company: {app.job.company?.name || 'N/A'}</p>
                        <p className={`mt-2 ${app.status === 'Accepted' ? 'text-green-400' : app.status === 'Rejected' ? 'text-red-400' : 'text-yellow-400'}`}>
                            Status: {app.status}
                        </p>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyApplications;
