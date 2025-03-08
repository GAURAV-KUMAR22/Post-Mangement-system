import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import InstanceUrl from '../../services/Instance';
import { Bounce, toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false)

    async function hanleUserLogin(e) {
        e.preventDefault();
        setloading(true);
        const fd = new FormData(e.target);
        const user = Object.fromEntries(fd);
        const Responce = await InstanceUrl.post('/login', user);
        const token = Responce.data.payload.Token;
        if (localStorage.getItem('Token')) {
            localStorage.removeItem('Token')
        }
        localStorage.setItem('Id', Responce.data.payload.userId)
        localStorage.setItem('User', Responce.data.payload.UserName)
        localStorage.setItem('Token', token)
        if (Responce.status === 200) {
            toast.success('You are successfully Login', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            navigate('/');
        }
        setloading(false)
    }

    return (
        <>
            <div className="ragister-container">
                <div className="form-wrapper">
                    <form onSubmit={hanleUserLogin} className="form-container">
                        <h1>Login User</h1>

                        <div className="input-tag">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />

                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <p>ForgotPassword ? <span><Link to='/forgot-password'>ForgotPassword</Link></span></p>
                        <div className="button-container">
                            {loading ? (<button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </button>) : <button type="submit">Login User</button>}
                            <Link className='btn btn-primary' style={{ marginLeft: '10px' }} to='/ragister'>Ragister</Link>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
