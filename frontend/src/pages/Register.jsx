import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', role: 'passenger'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await registerUser(formData);
            login(res.data.token, res.data.user);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed!');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '14px 16px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        color: 'white',
        fontSize: '15px',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s'
    };

    const labelStyle = {
        color: 'rgba(255,255,255,0.6)',
        fontSize: '13px',
        fontWeight: '500',
        display: 'block',
        marginBottom: '8px'
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', sans-serif",
            padding: '20px'
        }}>
            {/* Background glow */}
            <div style={{
                position: 'fixed',
                top: '20%', left: '50%',
                transform: 'translateX(-50%)',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(255,200,0,0.06) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <div style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: '48px',
                width: '100%',
                maxWidth: '460px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '8px'
                    }}>
                        <div style={{
                            width: '44px', height: '44px',
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            borderRadius: '12px',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '22px'
                        }}>🚗</div>
                        <span style={{
                            fontSize: '26px', fontWeight: '800',
                            color: 'white', letterSpacing: '-0.5px'
                        }}>RideBook</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                        புது account create பண்ணுங்க
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(255,59,48,0.15)',
                        border: '1px solid rgba(255,59,48,0.3)',
                        color: '#FF6B6B',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>⚠️ {error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Role Selection — முதல்ல */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>நான் ஒரு...</label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {['passenger', 'driver'].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setFormData({...formData, role})}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: formData.role === role
                                            ? 'linear-gradient(135deg, #FFD700, #FFA500)'
                                            : 'rgba(255,255,255,0.06)',
                                        border: formData.role === role
                                            ? 'none'
                                            : '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        color: formData.role === role ? '#000' : 'rgba(255,255,255,0.6)',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {role === 'passenger' ? '🧑 Passenger' : '🚗 Driver'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Full Name */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>Full Name</label>
                        <input
                            type="text"
                            placeholder="Thuvan Kumar"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(255,200,0,0.5)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>Email Address</label>
                        <input
                            type="email"
                            placeholder="thuvan@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(255,200,0,0.5)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {/* Phone */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="0771234567"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(255,200,0,0.5)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '28px' }}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(255,200,0,0.5)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '15px',
                            background: loading
                                ? 'rgba(255,200,0,0.5)'
                                : 'linear-gradient(135deg, #FFD700, #FFA500)',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#000',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'transform 0.2s',
                            letterSpacing: '0.3px'
                        }}
                        onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-1px)')}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        {loading ? '⏳ Creating account...' : '🚀 Create Account'}
                    </button>
                </form>

                <p style={{
                    color: 'rgba(255,255,255,0.4)',
                    textAlign: 'center',
                    marginTop: '24px',
                    fontSize: '14px'
                }}>
                    Already account இருக்கா?{' '}
                    <Link to="/login" style={{
                        color: '#FFD700',
                        textDecoration: 'none',
                        fontWeight: '600'
                    }}>Login பண்ணுங்க</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;