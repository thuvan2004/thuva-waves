import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginUser(formData);
            login(res.data.token, res.data.user);

            // Role-ஐ வச்சு redirect பண்றோம்
            if (res.data.user.role === 'admin') navigate('/admin/dashboard');
            else if (res.data.user.role === 'driver') navigate('/driver/dashboard');
            else navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    🚗 RideBook Login
                </h2>

                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 bg-gray-700 text-white rounded-lg"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 bg-gray-700 text-white rounded-lg"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-4">
                    Account இல்லையா?{' '}
                    <Link to="/register" className="text-yellow-500">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;