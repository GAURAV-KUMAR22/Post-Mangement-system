import React, { useEffect, useState } from 'react'
import '../App.css';
import Header from './Ui/Header';
const Home = () => {
    const [token, setToken] = useState('');
    const [User, setUser] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('Token');
        const User = localStorage.getItem('User');
        setToken(token);
        setUser(User)
    }, [])
    return (
        <div className=''>
            <div className='header'>
                <Header token={token} />
            </div>
            <div className='body'>
                <h1>I am: {User}</h1>
            </div>
            <div className='footer'>Footer</div>
        </div>
    )
}

export default Home
