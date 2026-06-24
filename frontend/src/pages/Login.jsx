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
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0533 30%, #0d1b4b 60%, #0a2a1a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', sans-serif",
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Colorful Background Blobs */}
            <div style={{
                position: 'fixed', top: '-150px', left: '-150px',
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(255,100,0,0.25) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'fixed', bottom: '-100px', right: '-100px',
                width: '450px', height: '450px',
                background: 'radial-gradient(circle, rgba(100,0,255,0.25) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'fixed', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px', height: '300px',
                background: 'radial-gradient(circle, rgba(0,200,255,0.15) 0%, transparent 70%)',
                borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none'
            }} />

            {/* Card */}
            <div style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '28px',
                padding: '48px',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px'
                    }}>
                        <div style={{
                            width: '48px', height: '48px',
                            background: 'linear-gradient(135deg, #FFD700, #FF6B00)',
                            borderRadius: '14px',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '24px',
                            boxShadow: '0 8px 24px rgba(255,150,0,0.5)'
                        }}>🚗</div>
                        <span style={{
                            fontSize: '28px', fontWeight: '900',
                            background: 'linear-gradient(135deg, #FFD700, #FF6B00)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.5px'
                        }}>Thuva Waves</span>
                    </div>
                    <p style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '14px'
                    }}>
                        உங்க premium ride-க்கு welcome! 🚀
                    </p>
                </div>

                {/* Feature Badges */}
                <div style={{
                    display: 'flex', gap: '8px',
                    justifyContent: 'center',
                    marginBottom: '28px',
                    flexWrap: 'wrap'
                }}>
                    {[
                        { icon: '⚡', text: 'Fast', color: '#FFD700' },
                        { icon: '🛡️', text: 'Safe', color: '#00FF88' },
                        { icon: '💰', text: 'Affordable', color: '#00D4FF' },
                    ].map((badge, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'rgba(255,255,255,0.06)',
                            border: `1px solid ${badge.color}30`,
                            padding: '6px 14px', borderRadius: '100px'
                        }}>
                            <span style={{ fontSize: '13px' }}>{badge.icon}</span>
                            <span style={{
                                color: badge.color,
                                fontSize: '12px', fontWeight: '700'
                            }}>{badge.text}</span>
                        </div>
                    ))}
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
                    {/* Email */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '13px', fontWeight: '600',
                            display: 'block', marginBottom: '8px'
                        }}>📧 Email Address</label>
                        <input
                            type="email"
                            placeholder="thuvan@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                            style={{
                                width: '100%', padding: '14px 16px',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px', color: 'white',
                                fontSize: '15px', outline: 'none',
                                boxSizing: 'border-box', transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#FFD700';
                                e.target.style.boxShadow = '0 0 0 3px rgba(255,200,0,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '28px' }}>
                        <label style={{
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '13px', fontWeight: '600',
                            display: 'block', marginBottom: '8px'
                        }}>🔒 Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                            style={{
                                width: '100%', padding: '14px 16px',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px', color: 'white',
                                fontSize: '15px', outline: 'none',
                                boxSizing: 'border-box', transition: 'all 0.2s'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#FFD700';
                                e.target.style.boxShadow = '0 0 0 3px rgba(255,200,0,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%', padding: '16px',
                            background: loading
                                ? 'rgba(255,200,0,0.4)'
                                : 'linear-gradient(135deg, #FFD700 0%, #FF6B00 100%)',
                            border: 'none', borderRadius: '14px',
                            color: '#000', fontSize: '16px',
                            fontWeight: '800',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 8px 24px rgba(255,150,0,0.4)',
                            letterSpacing: '0.3px'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 12px 32px rgba(255,150,0,0.6)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 24px rgba(255,150,0,0.4)';
                        }}
                    >
                        {loading ? '⏳ Logging in...' : '🚀 Login Now'}
                    </button>
                </form>

                {/* Divider */}
                <div style={{
                    display: 'flex', alignItems: 'center',
                    gap: '16px', margin: '24px 0'
                }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                </div>

                <p style={{
                    color: 'rgba(255,255,255,0.4)',
                    textAlign: 'center', fontSize: '14px'
                }}>
                    Account இல்லையா?{' '}
                    <Link to="/register" style={{
                        color: '#FFD700',
                        textDecoration: 'none', fontWeight: '700'
                    }}>Register here →</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;