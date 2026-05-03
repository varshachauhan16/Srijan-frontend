import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authoStore';
import api from '../../api/axiosInstance';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((s) => s.setAuth);

    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', form);
            setAuth(data.user, data.token);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #fce4ef 0%, #e3f0fb 100%)',
        }}>
            <div style={{
                background: '#ffffff',
                padding: '2.5rem',
                borderRadius: '16px',
                border: '1px solid #f0d6e8',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 4px 32px rgba(70,145,198,0.10)',
            }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #E1658A, #4691C6)',
                        margin: '0 auto 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="#fff" />
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '22px', fontWeight: '600', margin: 0, color: '#2d2d2d' }}>
                        Welcome Back
                    </h1>
                    <p style={{ color: '#999', fontSize: '13px', marginTop: '6px' }}>
                        Login Your CRM Here
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div style={{ marginBottom: '1.2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: '500',
                            marginBottom: '6px',
                            color: '#4691C6',
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email@company.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '11px 14px',
                                borderRadius: '10px',
                                border: '1.5px solid #d6eaf8',
                                fontSize: '14px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                color: '#2d2d2d',
                                transition: 'border 0.2s',
                            }}
                            onFocus={(e) => e.target.style.border = '1.5px solid #4691C6'}
                            onBlur={(e) => e.target.style.border = '1.5px solid #d6eaf8'}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '1.8rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: '500',
                            marginBottom: '6px',
                            color: '#E1658A',
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '11px 14px',
                                borderRadius: '10px',
                                border: '1.5px solid #fadadf',
                                fontSize: '14px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                color: '#2d2d2d',
                                transition: 'border 0.2s',
                            }}
                            onFocus={(e) => e.target.style.border = '1.5px solid #E1658A'}
                            onBlur={(e) => e.target.style.border = '1.5px solid #fadadf'}
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: loading
                                ? '#ccc'
                                : 'linear-gradient(135deg, #E1658A, #4691C6)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            letterSpacing: '0.3px',
                            transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => { if (!loading) (e.target as HTMLButtonElement).style.opacity = '0.9'; }}
                        onMouseLeave={(e) => { if (!loading) (e.target as HTMLButtonElement).style.opacity = '1'; }}
                    >
                        {loading ? 'Logging in...' : 'Login →'}
                    </button>

                </form>

                {/* Footer */}
                <p style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    fontSize: '12px',
                    color: '#bbb',
                }}>
                    Powered by <span style={{
                        background: 'linear-gradient(135deg, #E1658A, #4691C6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '600',
                    }}>CRM System</span>
                </p>

            </div>
        </div>
    );
};

export default Login;