import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', formData);
            const { token, role } = res.data;

            dispatch(loginSuccess({ token,role }));

            if (role === 'company') {
                navigate('/company/dashboard');
            } else {
                navigate('/user/jobs');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-80 space-y-4">
                <h2 className="text-2xl font-bold text-center">Register</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-700"
                    required
                />

                <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
                    <option value="user">User</option>
                    <option value="company">Company</option>
                </select>

                <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
