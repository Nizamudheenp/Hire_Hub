import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="pt-24 min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-4">
            <section className="text-center max-w-3xl mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Simplify Your Hiring & Job Search
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    HireHub connects companies and job seekers with a seamless application & hiring process.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link to="/register" className="bg-green-600 px-6 py-3 rounded-md text-white hover:bg-green-500 transition">
                        Get Started
                    </Link>
                    <Link to="/login" className="bg-gray-200 px-6 py-3 rounded-md text-gray-800 hover:bg-gray-300 transition">
                        Login
                    </Link>
                </div>
            </section>

            <section className="max-w-5xl w-full mb-20">
                <h2 className="text-3xl font-semibold mb-8 text-center">Why Use HireHub?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                        <div className="text-green-500 text-3xl mb-4">📝</div>
                        <h3 className="text-xl font-bold mb-2">Easy Job Posting</h3>
                        <p className="text-gray-600">Companies can post jobs effortlessly and manage applications in one dashboard.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                        <div className="text-green-500 text-3xl mb-4">💼</div>
                        <h3 className="text-xl font-bold mb-2">One-Click Apply</h3>
                        <p className="text-gray-600">Candidates apply to jobs quickly with resume uploads and simple forms.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                        <div className="text-green-500 text-3xl mb-4">🔒</div>
                        <h3 className="text-xl font-bold mb-2">Secure Access</h3>
                        <p className="text-gray-600">Role-based authentication ensures secure and personalized experiences.</p>
                    </div>
                </div>
            </section>

            <section className="max-w-4xl w-full mb-20">
                <h2 className="text-3xl font-semibold mb-8 text-center">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full text-2xl mb-4">
                            1
                        </div>
                        <h4 className="font-bold mb-2">Create Account</h4>
                        <p className="text-gray-600">Register as a company or user to get started.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full text-2xl mb-4">
                            2
                        </div>
                        <h4 className="font-bold mb-2">Post or Apply</h4>
                        <p className="text-gray-600">Companies post jobs. Users browse and apply easily.</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full text-2xl mb-4">
                            3
                        </div>
                        <h4 className="font-bold mb-2">Manage Applications</h4>
                        <p className="text-gray-600">Track jobs, applications, and resumes in your dashboard.</p>
                    </div>
                </div>
            </section>

            <footer className="w-full text-center py-6 text-gray-500 text-sm border-t">
                &copy; {new Date().getFullYear()} HireHub. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;
