import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
        </nav>
    )
}

export default Sidebar
