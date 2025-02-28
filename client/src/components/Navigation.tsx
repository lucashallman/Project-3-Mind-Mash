import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className = "app-nav">
            <ul className="nav-links">
                <li><NavLink to="/"end className={({isActive}) => (isActive ? 'active' :'')}>Home</NavLink></li>
                <li><NavLink to="/leaderboard"className={({isActive}) => (isActive ? 'active' :'')}>Leaderboard</NavLink></li>
                <li><NavLink to="/signuplogin"className={({isActive}) => (isActive ? 'active' :'')}>Signup/Login</NavLink></li>
                <li><NavLink to="/Profile"className={({isActive}) => (isActive ? 'active' :'')}>Profile</NavLink></li>
            </ul>
        </nav>
    )
};

export default Navigation;