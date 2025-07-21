import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
    const { token, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md px-8 py-4 flex justify-between items-center z-50">
            <Link to="/" className="text-xl font-semibold text-gray-800 hover:text-black transition">
                HireHub
            </Link>

            <div className="flex items-center gap-6">
                {!token && (
                    <Link to="/login" className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition">
                        Login
                    </Link>
                )}

                {token && role === 'user' && (
                    <>
                        <Link to="/user/jobs" className="text-gray-700 hover:text-black transition">Jobs</Link>
                        <Link to="/user/applications" className="text-gray-700 hover:text-black transition">My Applications</Link>
                        <button 
                            onClick={handleLogout} 
                            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 transition"
                        >
                            Logout
                        </button>
                    </>
                )}

                {token && role === 'company' && (
                    <>
                        <Link to="/company/dashboard" className="text-gray-700 hover:text-black transition">Dashboard</Link>
                        <button 
                            onClick={handleLogout} 
                            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 transition"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
