import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'sonner';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { email, password } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            toast.error('All fields are required');
            return false;
        }

        if (!emailRegex.test(email)) {
            toast.error('Invalid email format');
            return false;
        }

        if (password.length < 5) {
            toast.error('Password must be at least 5 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const res = await api.post('/auth/login', formData);
            const { token, role } = res.data;

            dispatch(loginSuccess({ token, role }));
            toast.success('Logged in successfully');

            if (role === 'company') {
                navigate('/company/dashboard');
            } else {
                navigate('/user/jobs');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
            <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-2">

                <form onSubmit={handleSubmit} className="p-10 space-y-5">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h3>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-500 transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-500 text-sm">
                        Don't have an account?{' '}
                        <a href="/register" className="text-green-600 hover:underline">
                            Register here
                        </a>
                    </p>
                </form>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-10 flex flex-col justify-center items-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Login to HireHub</h2>
                        <p className="text-lg max-w-xs">
                            Manage your applications, post jobs, and connect with talent in one place.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
