import React from 'react'
import Header from '../Ui/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Ui/Sidebar'

const Layout = () => {
    let isAuthenticated = true;
    return (
        <div className='container-layout'>
            <nav><Header /></nav>
            {isAuthenticated ? (<div className="main-container" style={{ 'marginTop': '100px' }}>
                <main className="content"><Outlet /></main>
            </div>) : (<div className="auth-container">Please Login</div>)
            }
        </div >
    )
}

export default Layout
