import { useEffect, useState } from 'react';
import api from '../../api/api';
import { toast } from 'sonner';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get('/user/applications/my');
                setApplications(res.data);
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to load applications');
            }
        };

        fetchApplications();
    }, []);

    if (applications.length === 0) {
        return <div className="mt-24 p-8 text-gray-500 text-center">You have not applied to any jobs yet.</div>;
    }

    return (
        <div className="mt-24 p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">My Applications</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((app) => (
                    <div key={app._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{app.job.title}</h3>
                        <p className="text-gray-500 mb-3"><strong>Company:</strong> {app.job.company?.name || 'N/A'}</p>

                        <span className={`
                            inline-block px-3 py-1 text-sm rounded-full mb-3
                            ${app.status === 'Accepted' ? 'bg-green-100 text-green-600' :
                              app.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                              'bg-yellow-100 text-yellow-600'}
                        `}>
                            {app.status}
                        </span>

                        {app.resumeLink ? (
                            <a
                                href={`http://localhost:5000${app.resumeLink}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition text-sm"
                            >
                                View Resume
                            </a>
                        ) : (
                            <p className="text-red-500 text-sm">No resume uploaded</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyApplications;
