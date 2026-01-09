/* eslint-disable no-unused-vars */
import React, { useState } from "react"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            const userExists = existingUsers.some(user => user.email === formData.email);
            
            if (userExists) {
                toast.error("User already exists with this email!", {
                    position: "top-center",
                    autoClose: 2000,
                    style: { marginBottom: "150px" },
                });
                return;
            }

            existingUsers.push(formData);
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

            toast.success("Registration successful!", {
                position: "top-center",
                autoClose: 2000,
                style: { marginBottom: "150px" },
            });
            
            navigate("/login");
        } catch (error) {
            toast.error("Registration failed!", {
                position: "top-center",
                autoClose: 2000,
                style: { marginBottom: "150px" },
            });
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;