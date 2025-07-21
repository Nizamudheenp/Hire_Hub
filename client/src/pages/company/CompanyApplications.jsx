import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'sonner';

const CompanyApplications = () => {
    const { jobId } = useParams();
    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {
        try {
            const res = await api.get(`/company/applications/${jobId}`);
            setApplications(res.data);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load applications');
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [jobId]);

    const handleStatusChange = async (appId, newStatus) => {
        try {
            await api.put(`/company/applications/status/${appId}`, { status: newStatus });
            toast.success(`Application ${newStatus}`);
            fetchApplications();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update status');
        }
    };

    if (applications.length === 0) {
        return <div className="mt-24 p-8 text-gray-500 text-center">No applications yet.</div>;
    }

    return (
        <div className="mt-24 p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Applications for this Job</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {applications.map((app) => (
                    <div key={app._id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">{app.user.name}</h3>
                            <p className="text-gray-500 mb-1">Email: {app.user.email}</p>

                            <p className="mb-3">
                                Status: <span className={`
                                    px-2 py-1 rounded text-sm 
                                    ${app.status === 'Accepted' ? 'bg-green-100 text-green-600' :
                                       app.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                                       'bg-yellow-100 text-yellow-600'}
                                `}>
                                    {app.status}
                                </span>
                            </p>

                            {app.resumeLink ? (
                                <a
                                    href={`http://localhost:5000${app.resumeLink}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline text-sm"
                                >
                                    View Resume
                                </a>
                            ) : (
                                <p className="text-red-500 text-sm mt-2">No resume uploaded</p>
                            )}
                        </div>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => handleStatusChange(app._id, 'Accepted')}
                                className="flex-1 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-500 text-sm"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleStatusChange(app._id, 'Rejected')}
                                className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-500 text-sm"
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
