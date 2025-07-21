import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'sonner';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
    };

    const validateForm = () => {
        const { name, email, password } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !password) {
            toast.error('All fields are required');
            return false;
        }

        if (!emailRegex.test(email)) {
            toast.error('Invalid email format');
            return false;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const res = await api.post('/auth/register', formData);
            const { token, role } = res.data;

            dispatch(loginSuccess({ token, role }));
            toast.success('Registered successfully');

            if (role === 'company') {
                navigate('/company/dashboard');
            } else {
                navigate('/user/jobs');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
            <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-2">

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-10 flex flex-col justify-center items-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Join HireHub</h2>
                        <p className="text-lg max-w-xs">
                            Find your next opportunity or hire top talent with ease.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-5">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Create an Account</h3>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
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

                    <div className="flex flex-col space-y-3">
                        <p className="font-medium text-gray-700">Select your role:</p>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => handleRoleSelect('user')}
                                className={`flex-1 p-3 rounded-md border ${formData.role === 'user' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                🙋‍♂️ I'm looking for a job
                            </button>
                            <button
                                type="button"
                                onClick={() => handleRoleSelect('company')}
                                className={`flex-1 p-3 rounded-md border ${formData.role === 'company' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                🏢 I'm hiring / posting jobs
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-500 transition"
                    >
                        Register
                    </button>

                    <p className="text-center text-gray-500 text-sm">
                        Already have an account?{' '}
                        <a href="/login" className="text-green-600 hover:underline">
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
