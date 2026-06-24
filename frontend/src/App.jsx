import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import PassengerDashboard from './pages/PassengerDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RideBooking from './pages/RideBooking';
import RideHistory from './pages/RideHistory';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" />;
    return children;
};

const AppRoutes = () => {
    const { user } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['passenger']}>
                    <PassengerDashboard />
                </ProtectedRoute>
            } />
            <Route path="/driver/dashboard" element={
                <ProtectedRoute allowedRoles={['driver']}>
                    <DriverDashboard />
                </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                </ProtectedRoute>
            } />
            <Route path="/book-ride" element={
                <ProtectedRoute allowedRoles={['passenger']}>
                    <RideBooking />
                </ProtectedRoute>
            } />
            <Route path="/ride-history" element={
                <ProtectedRoute allowedRoles={['passenger']}>
                    <RideHistory />
                </ProtectedRoute>
            } />
        </Routes>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
};

export default App;