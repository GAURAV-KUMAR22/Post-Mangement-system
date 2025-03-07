import React, { useState } from 'react'
import '../../App.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InstanceUrl from '../../services/Instance';
const ResetPassword = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false)
    const [searchParams] = useSearchParams();
    const resetToken = searchParams.get('token');


    async function hanleResetUser(e) {
        setloading(true)
        e.preventDefault();
        const fd = new FormData(e.target);
        const exisitingUser = Object.fromEntries(fd);
        console.log(exisitingUser)
        const Responce = await InstanceUrl.post(`http://localhost:5000/reset-password?token=${resetToken}`, exisitingUser);
        if (Responce.status === 200) {
            navigate('/login')
        }
        setloading(false)
    }
    return (
        <>
            <div className="ragister-container">
                <div className="form-wrapper">
                    <form onSubmit={hanleResetUser} className="form-container">
                        <h1>Login User</h1>

                        <div className="input-tag">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />

                            <label htmlFor="password">New-Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>

                        <div className="button-container">
                            {loading ? (<button class="btn btn-primary" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </button>) : <button type="submit">New Password Generate</button>}

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
