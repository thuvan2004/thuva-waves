import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PassengerDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');

    const stats = [
        { label: 'Total Rides', value: '24', icon: '🚗', color: '#FFD700' },
        { label: 'This Month', value: '8', icon: '📅', color: '#00D4FF' },
        { label: 'Total Spent', value: 'Rs. 4,200', icon: '💰', color: '#00FF88' },
        { label: 'Rating', value: '4.8 ⭐', icon: '🌟', color: '#FF6B6B' },
    ];

    const recentRides = [
        { from: 'Colombo Fort', to: 'Nugegoda', date: 'Jun 24', fare: 'Rs. 350', status: 'completed' },
        { from: 'Kandy Road', to: 'Pettah', date: 'Jun 23', fare: 'Rs. 220', status: 'completed' },
        { from: 'Galle Face', to: 'Bambalapitiya', date: 'Jun 22', fare: 'Rs. 180', status: 'cancelled' },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
            fontFamily: "'Inter', sans-serif",
            color: 'white'
        }}>
            {/* Navbar */}
            <nav style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 32px',
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '36px', height: '36px',
                        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                        borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px'
                    }}>🚗</div>
                    <span style={{ fontSize: '20px', fontWeight: '800' }}>RideBook</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        background: 'rgba(255,255,255,0.06)',
                        padding: '8px 16px', borderRadius: '100px'
                    }}>
                        <div style={{
                            width: '32px', height: '32px',
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '14px', fontWeight: '700', color: '#000'
                        }}>
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{user?.name}</span>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        style={{
                            background: 'rgba(255,59,48,0.15)',
                            border: '1px solid rgba(255,59,48,0.3)',
                            color: '#FF6B6B',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '600'
                        }}
                    >Logout</button>
                </div>
            </nav>

            <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto' }}>
                {/* Welcome */}
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{
                        fontSize: '32px', fontWeight: '800',
                        marginBottom: '4px',
                        background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.6))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        வணக்கம், {user?.name}! 👋
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>
                        இன்று எங்க போறீங்க?
                    </p>
                </div>

                {/* Book Ride CTA */}
                <div style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    borderRadius: '20px',
                    padding: '32px',
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                }}
                onClick={() => navigate('/book-ride')}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div>
                        <h2 style={{
                            fontSize: '24px', fontWeight: '800',
                            color: '#000', marginBottom: '4px'
                        }}>புதுசா Ride Book பண்ணு</h2>
                        <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '14px' }}>
                            Pickup location select பண்ணுங்க
                        </p>
                    </div>
                    <div style={{ fontSize: '48px' }}>🚖</div>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    {stats.map((stat, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                            padding: '20px',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                            <div style={{
                                fontSize: '22px', fontWeight: '800',
                                color: stat.color, marginBottom: '4px'
                            }}>{stat.value}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Rides */}
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                    padding: '24px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Recent Rides</h3>
                        <button
                            onClick={() => navigate('/ride-history')}
                            style={{
                                background: 'rgba(255,200,0,0.1)',
                                border: '1px solid rgba(255,200,0,0.2)',
                                color: '#FFD700',
                                padding: '6px 14px',
                                borderRadius: '100px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '600'
                            }}
                        >எல்லாமே பாரு</button>
                    </div>

                    {recentRides.map((ride, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '12px',
                            marginBottom: '8px',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{
                                    width: '40px', height: '40px',
                                    background: 'rgba(255,200,0,0.1)',
                                    borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '18px'
                                }}>🚗</div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                                        {ride.from} → {ride.to}
                                    </div>
                                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                                        {ride.date}
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    fontSize: '14px', fontWeight: '700',
                                    color: '#FFD700', marginBottom: '4px'
                                }}>{ride.fare}</div>
                                <div style={{
                                    fontSize: '11px', fontWeight: '600',
                                    color: ride.status === 'completed' ? '#00FF88' : '#FF6B6B',
                                    background: ride.status === 'completed'
                                        ? 'rgba(0,255,136,0.1)' : 'rgba(255,107,107,0.1)',
                                    padding: '2px 8px', borderRadius: '100px'
                                }}>
                                    {ride.status === 'completed' ? '✓ Completed' : '✗ Cancelled'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PassengerDashboard;