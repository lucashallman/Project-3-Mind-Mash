import { NavLink } from "react-router-dom";
import Auth from "../utils/auth";
const handleLogout = () => {
    Auth.logout();
    window.location.assign('/');
};

const Navigation = () => {
    return (
        <nav className="app-nav">
            <ul className="nav-links">
                <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
                <li><NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'active' : '')}>Leaderboard</NavLink></li>

                <li><NavLink to="/Profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink></li>
                <li><NavLink to="/stats" className={({ isActive }) => (isActive ? 'active' : '')}>Stats</NavLink></li>
                <li><NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>Signup</NavLink></li>
                <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></li>
            </ul>
            {Auth.loggedIn() && (
                <button
                    className="logout-button"
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </nav>
    );
};

export default Navigation;