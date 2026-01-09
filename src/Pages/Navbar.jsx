import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('currentUser'));

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');

        toast.success("Logged out successfully", {
            position: "top-center",
            autoClose: 2000,
        });

        navigate("/login");
        window.location.reload(); 
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <h2 className="logo">📝 To-Do App</h2>
                <div className="nav-links">
                    <Link to="/todohub">To-Do Hub</Link>
                    <Link to="/register">Register</Link>
                    
                    {user ? (
                        <button className="nav-button logout-button" onClick={handleLogout}>
                            Logout ({user.name})
                        </button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                    
                    <Link to="/">To-Do List</Link>
                    <Link to="/todotask">To-Do Tasks List</Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;