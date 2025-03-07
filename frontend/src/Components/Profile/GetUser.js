import React, { useState } from 'react'
import './GetUser.css'
import { FaPen } from "react-icons/fa";
import { useLocation, useParams } from 'react-router-dom';
const GetUser = () => {
    const [inputProfile, setinputProfile] = useState(false)
    const { id } = useParams();
    console.log(id)
    const location = useLocation();
    const user = location.state;
    console.log(user)
    function handleProfilePic() {
        setinputProfile(true);
        setTimeout(() => {
            setinputProfile(false)
        }, 10000);
    }
    return (
        <div className='userDash-container'>
            <div className='userDash'>
                <h1>USER DASHBOARD</h1>
                {inputProfile ? <input type='file' /> : <div className='userDash-profile'>
                    <img src='https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1741017690~exp=1741021290~hmac=cbbff309810d9465e25197231e0473788f349237b0544a5362f5cc33f7bf79c8&w=900' alt='profile'></img>
                    <button onClick={handleProfilePic}><FaPen size={20} /></button>
                </div>}

                <div className='userDash-content'>
                    <label>Username</label>
                    <label>UserId<span></span></label>
                </div>
                <div className='btn-userdash'>
                    <button>UpdateProfile</button>
                </div>
            </div>
        </div >
    )
}

export default GetUser
