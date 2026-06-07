import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiEdit3, FiArrowRight, FiLock, FiSearch, FiArchive, FiCheckCircle } from 'react-icons/fi';
import './Landing.css';

function Landing() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    // If already logged in, redirect to workspace home
    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="landing-page">
            <header className="landing-header">
                <div className="logo-container">
                    <FiEdit3 className="logo-icon" />
                    <span className="logo-text">Antigravity<span>Notes</span></span>
                </div>
                <nav className="header-nav">
                    <Link to="/login" className="nav-link-btn login">Log In</Link>
                    <Link to="/signup" className="nav-link-btn signup">Sign Up</Link>
                </nav>
            </header>

            <main className="hero-section">
                <div className="hero-tagline">
                    <FiCheckCircle /> Free, Secure, and Open Source
                </div>
                <h1 className="hero-title">
                    Organize your thoughts.<br />
                    <span>Empower your productivity.</span>
                </h1>
                <p className="hero-description">
                    A clean, minimal workspace for taking notes, managing your thoughts, and organizing your ideas. Scope your thoughts privately, access them instantly, and find everything quickly.
                </p>
                
                <div className="hero-actions">
                    <Link to="/signup" className="cta-primary">
                        Get Started Free <FiArrowRight />
                    </Link>
                    <Link to="/login" className="cta-secondary">
                        Sign In to Dashboard
                    </Link>
                </div>
            </main>

            <section className="features-section">
                <h2 className="section-title">Designed for modern thinking</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <FiLock />
                        </div>
                        <h3>Private & Scoped</h3>
                        <p>Your notes belong to you. We protect your workspace using encrypted authentication to isolate notes per account.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <FiSearch />
                        </div>
                        <h3>Instant Search</h3>
                        <p>Locate any thoughts instantly. Fast text indexing allows you to filter through titles and content on the fly.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon-wrapper">
                            <FiArchive />
                        </div>
                        <h3>Clean Workspace</h3>
                        <p>Archive outdated notes to hide them from your main list, keeping your canvas neat while preserving your records.</p>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <p>&copy; {new Date().getFullYear()} Antigravity Notes. Powered by Advanced Agentic Coding.</p>
            </footer>
        </div>
    );
}

export default Landing;