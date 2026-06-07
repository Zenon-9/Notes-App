import { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit3, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

import AuthService from '../features/auth/authService';
import { authStart, authSuccess, authFailure, clearError } from '../features/auth/authSlice';
import './Auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    // Clear any leftover auth errors when loading login page
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Redirect if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        dispatch(authStart());
        try {
            const data = await AuthService.login(email, password);
            dispatch(authSuccess(data));
            toast.success(`Welcome back, ${data.user.name}!`);
            navigate('/home');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            dispatch(authFailure(errorMessage));
            toast.error(errorMessage);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <FiEdit3 className="auth-logo" />
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="auth-error-message">
                            <FiAlertCircle /> {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="email-input">Email Address</label>
                        <div className="input-wrapper">
                            <input
                                id="email-input"
                                type="email"
                                placeholder="name@example.com"
                                className="auth-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <FiMail className="input-icon" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password-input">Password</label>
                        <div className="input-wrapper">
                            <input
                                id="password-input"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <FiLock className="input-icon" />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                    >
                        {loading ? <div className="spinner"></div> : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;