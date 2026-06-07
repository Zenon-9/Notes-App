import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiHome, FiArchive, FiPlus, FiLogOut, FiEdit3 } from "react-icons/fi";
import toast from "react-hot-toast";

import { logout } from "../../features/auth/authSlice";
import "./MainLayout.css";

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Successfully logged out.");
        navigate("/");
    };

    // Helper to check if a route is active
    const isActive = (path) => {
        return location.pathname + location.search === path;
    };

    // First letter of user's name for avatar
    const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <FiEdit3 className="brand-icon" />
                <span>Seeker</span>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-section-title">Workspace</div>
                <ul className="sidebar-menu">
                    <li>
                        <Link
                            to="/home"
                            className={`sidebar-link ${isActive("/home") || isActive("/home?tab=active") ? "active" : ""}`}
                        >
                            <FiHome className="sidebar-link-icon" />
                            <span>All Notes</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/home?tab=archive"
                            className={`sidebar-link ${isActive("/home?tab=archive") ? "active" : ""}`}
                        >
                            <FiArchive className="sidebar-link-icon" />
                            <span>Archive</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/note/new"
                            className={`sidebar-link ${isActive("/note/new") ? "active" : ""}`}
                        >
                            <FiPlus className="sidebar-link-icon" />
                            <span>New Note</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-user">
                <div className="user-profile">
                    <div className="user-avatar">{avatarLetter}</div>
                    <div className="user-details">
                        <span className="user-name">{user?.name || "User"}</span>
                        <span className="user-email">{user?.email || ""}</span>
                    </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <FiLogOut />
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
