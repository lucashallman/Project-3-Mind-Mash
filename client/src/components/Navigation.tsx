import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { QUERY_ME1 } from '../utils/queries';
import { IUser } from '../interfaces/User.js';
import Auth from "../utils/auth";
const handleLogout = () => {
    Auth.logout();
    window.location.assign('/');
};

const Navigation = () => {

    const { data } = useQuery(QUERY_ME1);
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        console.log(data);
        let userData;
        if (data) {
            userData = data?.me
        }
        setUser(userData);
        console.log(userData)
    }, [data])

    const userNavLink = user ? `/Profile/${user.username}` : `/login`

    return (
        <nav className="app-nav">
            <ul className="nav-links">
                <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
                <li><NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'active' : '')}>Leaderboard</NavLink></li>

                <li><NavLink to={userNavLink} className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink></li>
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