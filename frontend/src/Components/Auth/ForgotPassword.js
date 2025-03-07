
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import InstanceUrl from '../../services/Instance';

const ForgotPassword = () => {
    const [input, setInput] = useState();
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();

    async function HandleForgotPassword(e) {
        setloading(true);
        e.preventDefault();
        console.log(input)
        const Responce = await InstanceUrl.post('/forgot-password', { email: input })
        if (Responce.status === 200) {
            navigate('/')
            console.log('send email to reset password')
        }

        setloading(false)
    }
    return (
        <>
            <div className="ragister-container">
                <div className="form-wrapper">
                    <form onSubmit={HandleForgotPassword} className="form-container">
                        <h1>ForgotPassword User</h1>

                        <div className="input-tag">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required onChange={(e) => setInput(e.target.value)} />
                        </div>

                        <div className="button-container">
                            {loading ? (<button class="btn btn-primary" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </button>) : <button type="submit">ForgotPassword</button>}

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
