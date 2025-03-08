import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import InstanceUrl from '../../services/Instance';
import { Bounce, toast } from 'react-toastify';
import { TiThMenu } from "react-icons/ti";
import Header_menu from './Header-Menu';
const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('Token');
    async function handleLogout() {
        const responce = await InstanceUrl.get('/logout');
        if (!responce.ok) {
            console.log('respocne failed')
        }
        // console.log(responce);
        if (responce.status === 200) {
            window.location.reload();
            toast.success('You are successfully Logout', {
                position: "top-center",
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            navigate('/login');
            localStorage.clear();
        }
    }

    return (
        <div className='header-container'>
            <header className='header'>
                <div className='left'>
                    <div className='logo'></div>
                    <h2>Your Website</h2>
                    {token && (<><Link to={'/posts'}>Home</Link>
                        <Link to={'/new-post'}>Create-Post</Link>
                        <Link to={'/mangement'}>Mangement</Link></>)}

                </div>
                <div className='right'>
                    {/* {user && <h3>{user}</h3>} */}
                    <div className='right-icons'>
                        {token ? (<button className="btn btn-primary" onClick={handleLogout}>Logout</button>) : (<Link to='/login'>Login</Link>)}
                        <div>
                            <Header_menu />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
};

export default Header
