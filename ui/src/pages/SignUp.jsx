import { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit3, FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

import AuthService from '../features/auth/authService';
import { authStart, authSuccess, authFailure, clearError } from '../features/auth/authSlice';
import './Auth.css';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    // Clear leftover errors
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Redirect if logged in
    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }

        dispatch(authStart());
        try {
            const data = await AuthService.register(name, email, password);
            dispatch(authSuccess(data));
            toast.success(`Account created! Welcome, ${data.user.name}!`);
            navigate('/home');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed. Email might already be taken.';
            dispatch(authFailure(errorMessage));
            toast.error(errorMessage);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <FiEdit3 className="auth-logo" />
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="auth-error-message">
                            <FiAlertCircle /> {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="name-input">Full Name</label>
                        <div className="input-wrapper">
                            <input
                                id="name-input"
                                type="text"
                                placeholder="John Doe"
                                className="auth-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <FiUser className="input-icon" />
                        </div>
                    </div>

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
                        {loading ? <div className="spinner"></div> : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;