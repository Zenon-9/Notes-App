import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Notes App</h2>

            <nav>
                <ul>
                    <li>
                        <h4>Navigation</h4>
                    </li>

                    <li>
                        <h4>My Notes</h4>
                    </li>

                    <li>
                        <h4>Profile</h4>
                    </li>
                    <li>
                        <h4>Settings</h4>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/note/90">Note</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;