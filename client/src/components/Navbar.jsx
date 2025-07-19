import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { token, role } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
            <Link to="/" className="text-2xl font-bold">HireHub</Link>

            <div className="flex items-center gap-4">
                {!token && (
                    <>
                        <Link to="/" className="hover:text-gray-400">Home</Link>
                        <Link to="/register" className="hover:text-gray-400">Register</Link>
                        <Link to="/login" className="hover:text-gray-400">Login</Link>
                    </>
                )}

                {token && role === 'user' && (
                    <>
                        <Link to="/user/jobs" className="hover:text-gray-400">Jobs</Link>
                        <Link to="/user/applications" className="hover:text-gray-400">My Applications</Link>
                        <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-500">
                            Logout
                        </button>
                    </>
                )}

                {token && role === 'company' && (
                    <>
                        <Link to="/company/dashboard" className="hover:text-gray-400">Dashboard</Link>
                        <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-500">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
