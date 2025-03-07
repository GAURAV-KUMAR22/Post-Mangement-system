import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const ProtectedRoute = () => {
    const token = localStorage.getItem('Token')
    return token ? <Outlet /> : <Navigate to='/login' />
}


export default ProtectedRoute
