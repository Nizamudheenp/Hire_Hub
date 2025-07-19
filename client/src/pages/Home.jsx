import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                DevJobs – Find or Post Jobs Easily
            </h1>

            <p className="text-lg mb-6 text-center max-w-xl">
                A simple platform where companies can post job openings and users can apply directly with a resume link.
            </p>

            <div className="flex gap-4 mb-10">
                <Link to="/register" className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500 transition">
                    Get Started
                </Link>
                <Link to="/login" className="bg-gray-700 px-6 py-3 rounded hover:bg-gray-600 transition">
                    Login
                </Link>
            </div>

            <div className="mt-10 max-w-2xl text-center">
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <ul className="space-y-3 text-gray-300">
                    <li>🔒 Secure Role-based Authentication</li>
                    <li>📝 Companies can post and manage jobs</li>
                    <li>💼 Users can browse and apply for jobs easily</li>
                    <li>📂 Resume uploads supported</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
