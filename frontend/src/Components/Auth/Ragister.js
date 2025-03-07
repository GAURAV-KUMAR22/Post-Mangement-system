import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import InstanceUrl from '../../services/Instance';
import axios from "axios";
const Register = () => {
    const navigate = useNavigate();


    async function handleUserRegistration(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const user = Object.fromEntries(fd); //
        console.log(user);

        try {
            const response = await InstanceUrl.post('/ragister', user)

            if (response.status === 202) {
                console.log('Registration successful:', response.data);
                navigate('/login');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    return (
        <div className="register-container">
            <div className="form-wrapper">
                <form onSubmit={handleUserRegistration} className="form-container">
                    <h1>Register User</h1>

                    <div className="input-tag">
                        <label htmlFor="userName">Username</label>
                        <input type="text" id="username" name="userName" required />

                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>

                    <div className="button-container">
                        <button type="submit">Register User</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
